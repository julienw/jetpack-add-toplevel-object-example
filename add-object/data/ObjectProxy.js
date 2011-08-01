function attach(url) {
    let script = document.createElement("script");
    script.src = url;

    document.head.appendChild(script);
    window.addEventListener("x-lovely-message", doSomething, false, /* can be triggered by unprivileged content */ true);
}

function doSomething() {
    self.port.emit("lovely-message");
}

self.port.on("attach", attach);
