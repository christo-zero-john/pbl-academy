export default function FormContainer() {
  return (
    <div class="form-container sign-up-container ">
      <form action="#">
        <h1>Create Account</h1>
        <span>Using your email ID</span>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </form>
    </div>
  );
}
