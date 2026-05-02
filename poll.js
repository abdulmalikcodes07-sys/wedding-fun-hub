let votes = [0, 0];
let hasVoted = false;

function vote(option, btn) {
  if (hasVoted) return; // stop multiple voting

  hasVoted = true;
  votes[option]++;

  // highlight selected button
  document.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  // disable all buttons after voting
  document.querySelectorAll("button").forEach(b => b.disabled = true);

  const total = votes[0] + votes[1];

  const percent1 = ((votes[0] / total) * 100).toFixed(1);
  const percent2 = ((votes[1] / total) * 100).toFixed(1);

  document.getElementById("result").innerHTML = `
    Him: ${percent1}% <br>
    Her: ${percent2}%
  `;
}