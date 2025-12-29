// Mémoire cloud (persistante tant que le serveur n'est pas redéployé)
const cloudLists = {};

// CORS
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

  const body = await req.json();
  const { action, list, value, index } = body;

  if (!list) {
    return new Response(
      JSON.stringify({ error: "No list specified" }),
      { status: 400, headers }
    );
  }

  // Crée la liste si elle n'existe pas
  if (!cloudLists[list]) {
    cloudLists[list] = [];
  }

  // 🔹 ACTIONS
  switch (action) {

    case "add":
      cloudLists[list].push(String(value));
      return new Response(
        JSON.stringify({ ok: true }),
        { headers }
      );

    case "remove":
      if (index >= 0 && index < cloudLists[list].length) {
        cloudLists[list].splice(index, 1);
      }
      return new Response(
        JSON.stringify({ ok: true }),
        { headers }
      );

    case "length":
      return new Response(
        JSON.stringify({ length: cloudLists[list].length }),
        { headers }
      );

    case "get":
      return new Response(
        JSON.stringify({
          value: cloudLists[list][index] ?? ""
        }),
        { headers }
      );

    case "set":
      if (index >= 0) {
        cloudLists[list][index] = String(value);
      }
      return new Response(
        JSON.stringify({ ok: true }),
        { headers }
      );

    case "clear":
      cloudLists[list] = [];
      return new Response(
        JSON.stringify({ ok: true }),
        { headers }
      );

    case "exists":
      return new Response(
        JSON.stringify({
          exists: Array.isArray(cloudLists[list])
        }),
        { headers }
      );

    default:
      return new Response(
        JSON.stringify({ error: "Unknown action" }),
        { status: 400, headers }
      );
  }
};
