let lists = {}; // mémoire temporaire (on améliorera après)

export async function handler(event) {
  const params = JSON.parse(event.body || "{}");
  const list = params.list;
  const action = params.action;

  if (!list || !action) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "missing list or action" })
    };
  }

  lists[list] ??= [];

  switch (action) {

    case "add":
      lists[list].push(params.value);
      break;

    case "length":
      return {
        statusCode: 200,
        body: JSON.stringify({ length: lists[list].length })
      };

    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "unknown action" })
      };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, list: lists[list] })
  };
}

