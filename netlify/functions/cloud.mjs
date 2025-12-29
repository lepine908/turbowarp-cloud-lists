const cloudLists = {};

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

export const config = {
  path: "/cloud"
};

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { action, list, value, index } = await req.json();

  if (!cloudLists[list]) cloudLists[list] = [];

  switch (action) {

    case "add":
      cloudLists[list].push(String(value));
      break;

    case "remove":
      if (index >= 0 && index < cloudLists[list].length) {
        cloudLists[list].splice(index, 1);
      }
      break;

    case "clear":
      cloudLists[list] = [];
      break;

    case "insert":
      cloudLists[list].splice(index, 0, String(value));
      break;

    case "set":
      cloudLists[list][index] = String(value);
      break;

    case "get":
      return new Response(JSON.stringify({
        value: cloudLists[list][index] ?? ""
      }), { headers });

    case "indexOf":
      return new Response(JSON.stringify({
        index: cloudLists[list].indexOf(String(value)) + 1
      }), { headers });

    case "length":
      return new Response(JSON.stringify({
        length: cloudLists[list].length
      }), { headers });

    case "contains":
      return new Response(JSON.stringify({
        contains: cloudLists[list].includes(String(value))
      }), { headers });
  }

  return new Response(JSON.stringify({ ok: true }), { headers });
};
