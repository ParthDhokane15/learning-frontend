// Simulate fetching a user from a database
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    console.log(`🔍 Fetching user with id ${userId}…`);
    setTimeout(() => {
      if (userId === 0) {
        reject("User not found");            // simulate a “not found” error
      } else {
        resolve({ id: userId, name: "Alice" });
      }
    }, 1000);
  });
}

// Simulate fetching posts for a given user
function fetchPosts(user) {
  return new Promise((resolve) => {
    console.log(`📝 Fetching posts for ${user.name}…`);
    setTimeout(() => {
      resolve([
        { id: 101, title: "My first post" },
        { id: 102, title: "A day in the life" }
      ]);
    }, 1500);
  });
}

// Simulate fetching comments for a given post
function fetchComments(post) {
  return new Promise((resolve) => {
    console.log(`💬 Fetching comments for post "${post.title}"…`);
    setTimeout(() => {
      resolve([
        { id: 1001, text: "Great post!" },
        { id: 1002, text: "Thanks for sharing." }
      ]);
    }, 1000);
  });
}

// Chain the Promises together
fetchUser(1)                   // Start by fetching user with id=1
  .then(user => {
    console.log("✅ User fetched:", user);
    return fetchPosts(user);   // Return next promise: fetch this user’s posts
  })
  .then(posts => {
    console.log("✅ Posts fetched:", posts);
    return fetchComments(posts[0]);  // Fetch comments for the first post
  })
  .then(comments => {
    console.log("✅ Comments fetched for first post:", comments);
    console.log("🎉 Workflow complete!");
  })
  .catch(error => {
    console.error("❌ Error occurred:", error);
  });


  function sumAsync(x, y) {
    console.log("1. sumAsync is executed");
    const p = new Promise((resolve, reject) => {
        // run this in 500ms from now
        setTimeout(() => {
            console.log("4. Resolving sumAsync's Promise with the result after 500ms");
            resolve(x + y);
        }, 500);

        // we don't need to return anything
        console.log("2. sumAsync Promise is initialized");            
    });
    console.log("3. sumAsync has returned the Promise");
    return p;
}

// let's use the function now
sumAsync(5, 7).then((result) => {
    console.log("5. The result of the addition is:", result);
});
// The output will be:
// 1. sumAsync is executed
// 2. sumAsync Promise is initialized
// 3. sumAsync has returned the Promise
// 4. Resolving sumAsync's Promise with the result after 500ms
// 5. The result of the addition is: 12