# Tokenization Service

A reference implementation of a PAN/PII tokenization and detokenization service.

## Features

-   **Tokenization/Detokenization**: Securely tokenize and detokenize sensitive data like PANs and PII.
-   **KMS Integration**: Utilizes AWS KMS for managing encryption keys, ensuring cryptographic operations are handled by a dedicated HSM.
-   **Role-Based Access Control (RBAC)**: Granular control over who can perform tokenization and detokenization actions.
-   **Audit Logging**: Comprehensive logging of all API requests and system events for security and compliance.
-   **Data Redaction**: Automatic redaction of sensitive data from logs.
-   **PCI DSS Scope Minimization**: Designed to help minimize the scope of PCI DSS audits.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   Docker and Docker Compose
-   AWS Account with KMS configured

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR-USER/tokenization-service.git
    cd tokenization-service
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file from the example and update the values.
    ```bash
    cp .env.example .env
    ```

4.  **Run the database:**
    ```bash
    docker-compose up -d db
    ```

5.  **Run database migrations:**
    ```bash
    npm run migrate:latest
    ```

6.  **Start the application:**
    ```bash
    npm run dev
    ```

The service will be available at `http://localhost:3000`.