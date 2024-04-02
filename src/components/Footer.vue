<script setup>
</script>

<template>
  <footer>
    <div class="footer-section left">
      <img src="@/assets/QBlogo.png" alt="Quiz Bear Logo" class="logo" />
      <p>&copy; 2024 Quizzebassen. All rights reserved.</p>
    </div>
    <div class="footer-section center">
      <img src="@/assets/feedback.png" alt="Feedback logo" class="logo" />
      <RouterLink to="/feedback" class="footer-link">Feedback</RouterLink>
    </div>
    <div class="footer-section right">
            <img src="@/assets/contact.png" alt="Contact Logo" class="logo" />
      <a href="mailto:support@quizzebassen.com" class="footer-link">Contact</a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
}

.footer-section {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 10px;
  height: auto;
  min-width: 50px;
  max-width: 50px;
}

.footer-section.left {
  justify-content: flex-start;
  flex-grow: 1;
}

.footer-section.center {
  flex-grow: 1;
}

.footer-section.right {
  justify-content: flex-end;
  flex-grow: 1;
}
</style>