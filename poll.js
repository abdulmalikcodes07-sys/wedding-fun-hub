let votes = [0, 0];

function vote(option, btn) {
  votes[option]++;

  document.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  const total = votes[0] + votes[1];

  const percent1 = ((votes[0] / total) * 100).toFixed(1);
  const percent2 = ((votes[1] / total) * 100).toFixed(1);

  document.getElementById("result").innerHTML = `
    Him: ${percent1}% <br>
    Her: ${percent2}%
  `;
}
