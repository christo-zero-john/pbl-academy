export default function FormContainer({
  varient,
  handler = null,
  formData = null,
  setFormData = null,
}) {
  const varients = {
    create_account: (
      <>
        <h1>Create Account</h1>
        <span>Using your email ID</span>        
        <input
          type="email"
          placeholder="Email"
          value={formData?.email || ""}
          onChange={(e) =>
            setFormData?.({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={formData?.password || ""}
          onChange={(e) =>
            setFormData?.({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Create Account</button>
      </>
    ),
    login: (
      <>
        <h1>Log in</h1>
        <span>to your account</span>
        <input
          type="email"
          placeholder="Email"
          value={formData?.email || ""}
          onChange={(e) =>
            setFormData?.({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={formData?.password || ""}
          onChange={(e) =>
            setFormData?.({ ...formData, password: e.target.value })
          }
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Log In</button>
      </>
    ),
  };
  console.log(varients[varient]);

  return (
    <div className={`form-container ${varient === 'login' ? 'sign-in-container' : 'sign-up-container'}`}>
      <form onSubmit={handler}>{varients[varient]}</form>
    </div>
  );
}
