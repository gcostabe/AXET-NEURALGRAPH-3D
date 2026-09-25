use serde::{Deserialize, Serialize};
use std::net::TcpListener;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ServicePorts {
    pub postgres: u16,
    pub qdrant: u16,
    pub backend: u16,
    pub frontend: u16,
    pub gateway: u16,
}

impl Default for ServicePorts {
    fn default() -> Self {
        Self {
            postgres: 5432,
            qdrant: 6333,
            backend: 8000,
            frontend: 3001,
            gateway: 8766,
        }
    }
}

pub fn is_port_available(port: u16) -> bool {
    match TcpListener::bind(("127.0.0.1", port)) {
        Ok(_) => true,
        Err(_) => false,
    }
}

pub fn find_available_port(preferred: u16, fallback_range: std::ops::Range<u16>) -> u16 {
    if is_port_available(preferred) {
        return preferred;
    }
    for port in fallback_range {
        if is_port_available(port) {
            return port;
        }
    }
    // Caso extremo: deixa o sistema operacional escolher uma porta livre
    TcpListener::bind(("127.0.0.1", 0))
        .map(|listener| listener.local_addr().map(|addr| addr.port()).unwrap_or(preferred))
        .unwrap_or(preferred)
}

pub fn resolve_all_ports() -> ServicePorts {
    let postgres = find_available_port(5432, 15432..15500);
    let qdrant = find_available_port(6333, 16333..16400);
    let backend = find_available_port(8000, 18000..18100);
    let frontend = find_available_port(3001, 13001..13100);
    let gateway = find_available_port(8766, 18766..18850);

    ServicePorts {
        postgres,
        qdrant,
        backend,
        frontend,
        gateway,
    }
}
