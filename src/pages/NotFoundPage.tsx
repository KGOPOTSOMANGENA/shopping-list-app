import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <Link to="/" style={styles.button}>
        Go Back Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center" as const,
    padding: "20px",
  },
  code: {
    fontSize: "80px",
    fontWeight: "bold",
  },
  button: {
    marginTop: "20px",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#000",
    color: "#fff",
  },
};

export default NotFoundPage;
