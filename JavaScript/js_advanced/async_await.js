// Simulate a network request that returns JSON
function fakeFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: `Response from ${url}` }), 1000);
  });
}

async function loadData() {
  try {
    console.log("Fetching user…");
    const user = await fakeFetch("/api/user");
    console.log("User:", user.data);

    console.log("Fetching posts…");
    const posts = await fakeFetch("/api/posts");
    console.log("Posts:", posts.data);

    console.log("Done loading data.");
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

loadData();

// Simulate a delay
// This function returns a promise that resolves after a specified number of milliseconds
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function uppercaseString(s) {
    await sleep(10000);
    
    return s.toUpperCase();
}

uppercaseString("edward").then(console.log);