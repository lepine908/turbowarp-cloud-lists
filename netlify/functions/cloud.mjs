export const config = {
  path: "/cloud"
};

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};

let data = {};

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method === "POST") {
    const body = await req.json();

    // ajouter
    if (body.action === "ajouter") {
      if (!data[body.liste]) {
        data[body.liste] = [];
      }
      data[body.liste].push(body.valeur);
      return new Response(JSON.stringify({ ok: true }), { headers });
    }

    // longueur
    if (body.action === "longueur") {
      const liste = data[body.liste] || [];
      return new Response(
        JSON.stringify({ valeur: liste.length }),
        { headers }
      );
    }

    // élément (index commence à 1)
    if (body.action === "element") {
      const liste = data[body.liste] || [];
      const index = Number(body.index) - 1;
      const valeur = liste[index] ?? '';
      return new Response(
        JSON.stringify({ valeur }),
        { headers }
      );
    }
  }

  return new Response(JSON.stringify({ ok: false }), { headers });
};
