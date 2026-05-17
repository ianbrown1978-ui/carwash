<script>
 import { loggedInUser } from '$lib/stores/globals'; // global vals need importing
 //console.log('logged in user  from footer component:',loggedInUser)
</script>
<footer>
  Welcome Back {$loggedInUser}!<a href="/backend">Admin</a> - © 2025 By You! 
</footer>