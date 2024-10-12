export async function uploadDecal(file: File) {
  const url = "http://localhost:3000/api/decal/upload";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: file,
  });

  const data = await response.json();
  return data.message;
}
