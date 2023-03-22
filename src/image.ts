let url: string;

function resolveMimetype(path: string) {
  const ext = path.split(".").at(-1);

  switch (ext) {
    case "apng":
      return "image/apng";
    case "avif":
      return "image/avif";
    case "gif":
      return "image/gif";
    case "jpg":
    case "jpeg":
    case "jfif":
    case "pjpeg":
    case "pjp":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "svg":
      return "image/svg+xml";
    case "webp":
      return "image/webp";
    case "bmp":
      return "image/bmp";
    case "ico":
      return "image/x-icon";
    default:
      return undefined;
  }
}

export function init() {
  const root = document.createElement("div");
  root.id = "root";
  root.style.position = "relative";
  document.body.appendChild(root);
}

export function updateContent({
  content,
  path,
}: {
  content?: Uint8Array;
  path?: string;
}) {
  URL.revokeObjectURL(url);
  const root = document.getElementById("root")!;
  if (!content || !path) {
    root.innerHTML = "";
    return;
  }

  const img = document.createElement("img");
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "contain";
  img.style.position = "absolute";
  img.style.top = "50%";
  img.style.left = "50%";
  img.style.transform = "translate(-50%, -50%)";

  url = URL.createObjectURL(
    new Blob([content.buffer], { type: resolveMimetype(path) })
  );
  img.src = url;
  img.onload = () => {
    root.innerHTML = "";
    root.appendChild(img);
  };
  img.onerror = (e) => {
    root.innerHTML = "Cannot load the image.";
  };
}
