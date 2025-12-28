export const config = {
  path: "/cloud"
};

export default async (req) => {
  return new Response(
    JSON.stringify({ ok: true, message: "cloud function works" }),
    { headers: { "Content-Type": "application/json" } }
  );
};
