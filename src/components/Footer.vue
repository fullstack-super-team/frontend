<script setup>
</script>

<template>
  <footer>
    <div class="footer-section left">
      <img src="@/assets/QBlogo.png" alt="Quizzebassen Logo" class="logo" />
      <p>&copy; 2024 Quizzebassen. All rights reserved.</p>
    </div>
    <div class="footer-section center">

      <RouterLink to="/feedback" class="footer-link">
        <img src="@/assets/feedback.png" alt="Feedback logo" class="logo" />
        Feedback
      </RouterLink>
    </div>
    <div class="footer-section right">
      <a href="mailto:support@quizzebassen.com" class="footer-link">
        <img src="@/assets/contact.png" alt="Contact Logo" class="logo" />
        Contact
      </a>
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
  background-color: #0f3f6b;
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

p {
  font-size: 0.75rem;
  color: white;
}

.footer-link {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  margin-left: 5px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 0.9rem;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>