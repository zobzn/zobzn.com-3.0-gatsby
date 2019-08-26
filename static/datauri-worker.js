self.addEventListener(
  "message",
  function(e) {
    const file = e.data;
    const reader = new FileReaderSync();
    const datauri = reader.readAsDataURL(file);

    postMessage({
      filename: file.name,
      url: datauri
    });
  },
  false
);
