use serde::{Deserialize, Serialize};
use std::net::UdpSocket;
use std::process::Command;
use std::str;
use std::time::Duration;
use tauri::command;

use bollard::image::ListImagesOptions;
use bollard::{Docker, API_DEFAULT_VERSION};

#[derive(Debug, Deserialize)]
pub struct RequestBody {
  id: i32,
  name: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "UPPERCASE")]
enum DockerConnectionStrategy {
  LOCAL,
  REMOTE,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct DockerConfig {
  strategy: DockerConnectionStrategy,

  #[serde(default)]
  docker_addr: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct DockerInfo {
  memory: String,
  version: String,
}
#[derive(Debug, Deserialize, Serialize)]
pub struct Endpoint {
  #[serde(default)]
  docker_addr: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct AdvertiseOk {
  ok: String,
}

#[command]
pub fn hello_world_test(event: String) -> Option<String> {
  let stdout = hello_world(event);
  Some(stdout)
}

#[command]
pub async fn test_docker(event: String) -> Option<String> {
  let x: DockerConfig = serde_json::from_str(event.as_str()).unwrap();

  let docker;

  match x.strategy {
    DockerConnectionStrategy::LOCAL => {
      docker = Docker::connect_with_local_defaults().unwrap();
    }
    DockerConnectionStrategy::REMOTE => {
      docker = Docker::connect_with_http(x.docker_addr.as_str(), 4, API_DEFAULT_VERSION).unwrap();
    }
  }

  let version = docker.version().await.unwrap();
  let system_info = docker.info().await.unwrap();

  let info = DockerInfo {
    memory: system_info.mem_total.unwrap().to_string(),
    version: version.api_version.unwrap(),
  };

  Some(serde_json::to_string(&info).unwrap())
}

#[command]
pub async fn advertise_endpoint(event: String) -> Option<String> {
  let x: Endpoint = serde_json::from_str(event.as_str()).unwrap();

  let socket: UdpSocket = UdpSocket::bind("0.0.0.0:0").unwrap();
  socket.set_read_timeout(Some(Duration::new(5, 0))).unwrap();
  socket.set_broadcast(true).unwrap();
  println!("Connected on port {}", x.docker_addr);
  println!("Broadcast: {:?}", socket.broadcast());
  println!("Timeout: {:?}", socket.read_timeout());

  let call: Vec<u8> = "packer.get_buf()?".as_bytes().to_vec();
  println!("Sending call, {} bytes", call.len());
  socket.send_to(&call, "255.255.255.255:45678").unwrap();

  let info = AdvertiseOk {
    ok: "ok".to_string(),
  };

  Some(serde_json::to_string(&info).unwrap())
}

#[command]
pub async fn nana_test(event: String) -> Option<String> {
  let docker = Docker::connect_with_local_defaults().expect("Failed to connect to docker");

  let version = docker.version().await.unwrap();
  let images = &docker
    .list_images(Some(ListImagesOptions::<String> {
      all: true,
      ..Default::default()
    }))
    .await
    .unwrap();

  let mut x = String::new();

  for image in images {
    x = image.id.clone();
  }

  Some(x)
}

#[command]
pub fn ls_test(event: String) -> Option<String> {
  let stdout = ls(event);
  Some(stdout)
}

pub fn hello_world(event: String) -> String {
  let output = if cfg!(target_os = "windows") {
    Command::new("cmd")
      .args(["/C", format!("echo {}", event.to_string()).as_str()])
      .output()
      .expect("failed to execute process")
  } else {
    Command::new("sh")
      .arg("-c")
      .arg(format!("echo {}", event.to_string()).as_str())
      .output()
      .expect("failed to execute process")
  };
  let stdout = String::from_utf8(output.stdout).unwrap();
  return stdout;
}

pub fn ls(event: String) -> String {
  let output = Command::new("ls")
    .output()
    .expect("failed to execute process");

  print!("event: {}", event);
  let stdout = String::from_utf8(output.stdout).unwrap();
  return stdout;
}
