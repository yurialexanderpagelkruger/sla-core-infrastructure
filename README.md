# SLA-Core

**SLA-Core** is a high-availability, disaster recovery (DR), and infrastructure modernization framework designed for enterprise Linux environments. Built specifically for systems administrators, IT consultants, and technical leads overseeing mission-critical workloads in SMBs, *SLA-Core* eliminates single points of failure (SPOF) and replaces precarious manual processes with automated, resilient, and production-tested operations.

Featuring an automated backup engine, perimeter hardening routines, containerized service isolation, and continuous telemetry, the framework transforms vulnerable monolithic servers into high-availability infrastructures, guaranteeing business continuity and measurable recovery windows (RPO/RTO).

---

### 📸 Screenshots

<div align="center">
  <table border="0">
    <thead>
      <tr>
        <th align="center">Desktop Version</th>
        <th align="center">Mobile Version</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center" valign="middle">
          <img src="screenshot.gif" alt="Desktop Version" width="612" />
        </td>
        <td align="center" valign="middle">
          <img src="screenshot2.gif" alt="Mobile Version" width="159" />
        </td>
      </tr>
    </tbody>
  </table>
</div>

---

## ✨ Key Features

* **Multi-Language Support (i18n):** Web management interface fully localized across 3 languages: English, Spanish, and Portuguese, ensuring seamless operation for international operations teams.

* **Adaptive Theming (Dark & Light Mode):** Dynamic UI theme switching between Dark and Light modes, optimized for prolonged monitoring sessions in Network Operations Centers (NOC) and high-ambient light environments.

* **Zero-SPOF Storage Architecture:** Block storage redundancy using software RAID 1 (`mdadm`) or mirrored ZFS pools, preventing complete service downtime caused by physical disk failures.

* **Automated Multi-Target Backup Engine:** Resilient Bash orchestrator featuring Zstandard (`zstd`) compression, local retention policies, cryptographic SHA-256 signatures, and encrypted remote synchronization (`rsync`).

* **Audited Disaster Recovery (DR) Verification:** Dedicated non-destructive validation utility (`test_restore.sh`) that verifies archive integrity and dry-run database restoration pipelines prior to genuine contingency events.

* **Perimeter Hardening & Kernel Optimization:** Baseline security profile applying strict kernel-level network directives via `sysctl`, SSH root direct login deactivation, automated security patching (`unattended-upgrades`), and intrusion mitigation via `fail2ban`.

* **Encrypted Administration Tunnel:** Dedicated WireGuard VPN configuration that isolates administrative ports (SSH, databases, metrics endpoints) entirely outside public network reach.

* **Comprehensive Telemetry & Proactive Alerting:** Preconfigured Prometheus and Node Exporter stack monitoring host performance, disk saturation, memory consumption, and service status against predefined alert thresholds.

---

## ⚙️ What It Does (Available Modules)

From initial deployment to continuous runtime orchestration, *SLA-Core* deploys the following core components:

1. **System Hardening & Perimeter Defense (`scripts/system_hardening.sh`):** Configures kernel TCP/IP mitigations, disables password-based SSH authentication, enables UFW firewall policies, and enforces intrusion protection jails with Fail2ban.

2. **Management Dashboard & UI Theming Layer:** Responsive web operations panel delivering client-side localization across 3 languages (English, Spanish, Portuguese) alongside smooth Dark/Light mode theme switching.

3. **Automated Backup Engine (`scripts/backup_engine.sh`):** Performs hot database dumps, packages Docker volumes, compresses payloads via `zstd`, generates SHA-256 checksum manifests, syncs with remote offsite storage, and enforces retention lifecycle policies.

4. **Disaster Recovery Integrity Test (`scripts/test_restore.sh`):** Evaluates backup archives against cryptographic signatures and tests archive decompression without affecting running production services.

5. **Metrics Telemetry & Alerting (`docker-compose.yml` & `prometheus/`):** Runs Prometheus and Node Exporter inside isolated containers configured with alert rules targeting storage saturation, RAM consumption spikes, or node dropouts.

6. **Secure Remote Access (`wireguard/wg0.conf`):** Encapsulates all administrative ingress traffic inside an asymmetric-key authenticated peer-to-peer virtual private network.

---

## 🛠️ Tech Stack

* **Operating Systems:** Debian GNU/Linux 12 (Bookworm) / Red Hat Enterprise Linux 9 (RHEL).
* **Containers & Orchestration:** Docker and Docker Compose v2.
* **Frontend & Theming:** Semantic HTML5, CSS3 with responsive Dark and Light mode design tokens, and JavaScript.
* **Internationalization:** Multi-language catalog support (English, Spanish, Portuguese).
* **Automation & Scripting:** Enterprise Bash (`set -Eeuo pipefail` standard), GNU Coreutils, `zstd`.
* **Telemetry & Monitoring:** Prometheus TSDB and Node Exporter.
* **Security & Networking:** WireGuard VPN, UFW / iptables, Fail2ban, OpenSSH.

---

## 🚀 Installation and Usage

1. Clone the repository onto the target server:
   ```bash
   git clone [https://github.com/yurialexanderpagelkruger/sla-core-infrastructure.git](https://github.com/yurialexanderpagelkruger/sla-core-infrastructure.git)
   cd sla-core-infrastructure

## 👨‍💻 Author

Developed by **Yuri Alexander Pagel Krüger**