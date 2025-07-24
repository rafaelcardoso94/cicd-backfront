package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "sync"
)

type Config struct {
    Mensagem string `json:"mensagem"`
}

var (
    contador int
    mutex    sync.Mutex
    config   Config
)

func enableCors(w http.ResponseWriter) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func contadorHandler(w http.ResponseWriter, r *http.Request) {
    enableCors(w)

    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    mutex.Lock()
    contador++
    numeroAtual := contador
    mutex.Unlock()

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "mensagem": config.Mensagem,
        "contador": numeroAtual,
    })
}

func carregarConfig(path string) error {
    data, err := os.ReadFile(path)
    if err != nil {
        return err
    }

    return json.Unmarshal(data, &config)
}

func main() {
    if err := carregarConfig("config.yaml"); err != nil {
        log.Fatalf("Erro ao carregar config: %v", err)
    }

    http.HandleFunc("/contador", contadorHandler)

    fmt.Println("Servidor rodando em http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
