export default {
  async fetch(request) {
    
 const newRequestInit = {
      // Change method
      method: "GET",
      // Change headers, note this method will erase existing headers
      headers: {
        "Content-Type": "application/json",
      },
      // Change a Cloudflare feature on the outbound response
      cf: { apps: false },
    };

    const newRequest = new Request(
      request.url.toString(),
      new Request(request, newRequestInit)
    );
    // Set headers using method
    newRequest.headers.set("X-Cipher", request.cf.tlsCipher);
    newRequest.headers.set("Content-Type", "application/json");
    try {
      return await fetch(newRequest);
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
      });
    }
  },
};