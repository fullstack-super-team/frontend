<script setup>
import mainStore from "@/stores/mainStore.js";
import Button from "@/components/Button.vue";
mainStore.dispatch('game/loadQuizById', 1);
</script>

<template>
  <Button class="finish-btn">Finish</Button>
  <h1 class="title">Quiz Title</h1>
  <div class="score-container">
    <div class="result">
      <h2>YOU GOT</h2>
      <h1>6/10</h1>
      <h2>CORRECT ANSWERS</h2>
    </div>
    <div class="highscore">
      <h2>Highscore</h2>
      <p>Here are the top 10 players:</p>
      <ol>
        <li>Player 1 - 100 points</li>
        <li>Player 2 - 90 points</li>
        <li>Player 3 - 80 points</li>
        <li>Player 4 - 70 points</li>
        <li>Player 5 - 60 points</li>
        <li>Player 6 - 50 points</li>
        <li>Player 7 - 40 points</li>
        <li>Player 8 - 30 points</li>
        <li>Player 9 - 20 points</li>
        <li>Player 10 - 10 points</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.finish-btn {
  margin: 20px auto;
  display: block;
}

.title {
  text-align: center;
}

.score-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  position: relative; /* Add position relative to the container */
}

.score-container::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  border-left: 2px solid black; /* This creates the line */
  transform: translateX(-50%); /* This ensures the line is exactly in the middle */
}


.result {
  text-align: center;

}

</style>