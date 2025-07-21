package main

import (
    "fmt"
    "log"
    "net/http"
    "sync"
)

var (
    contador int
    mutex    sync.Mutex
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

    fmt.Fprintf(w, "%d", numeroAtual)
}

func main() {
    http.HandleFunc("/contador", contadorHandler)

    fmt.Println("Servidor rodando em http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
