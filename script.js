document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Initially display the loading row
  output.innerHTML = `<tr><td colspan="2">Loading...</td></tr>`;

  function getRandomTime() {
    return (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
  }

  const createPromise = (index) => {
    const time = getRandomTime();
    return new Promise((resolve) => {
      setTimeout(() => resolve({ index, time }), time * 1000);
    });
  };

  const promises = [createPromise(1), createPromise(2), createPromise(3)];
  const startTime = performance.now();

  Promise.all(promises).then((results) => {
    const endTime = performance.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(3);

    // Clear the loading row
    output.innerHTML = "";

    // Populate the table with resolved values
    results.forEach(({ index, time }) => {
      output.innerHTML += `<tr><td>Promise ${index}</td><td>${time}</td></tr>`;
    });

    // Add total row
    output.innerHTML += `<tr><td><strong>Total</strong></td><td>${totalTime}</td></tr>`;
  });
});
