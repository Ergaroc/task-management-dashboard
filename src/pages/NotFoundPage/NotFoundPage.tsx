// React-router
import { useLocation, useNavigate } from "react-router";
// Atoms
import { Button } from "@/ui/atoms";
// Icons
import { ArrowLeft } from "@/icons/components";
// Styles
import "./not-found-page.scss";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <section className="p-not-found container" aria-labelledby="nf-title">
      <p className="p-not-found__code">404</p>
      <h1 id="nf-title" className="p-not-found__title">
        Page not found
      </h1>
      <p className="p-not-found__desc">
        We couldn't find <code className="p-not-found__path">{pathname}</code>.
      </p>

      <div className="p-not-found__actions">
        <Button
          type="button"
          variant="white"
          leftIcon={<ArrowLeft />}
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
        <Button type="button" variant="blue" onClick={() => navigate("/tasks")}>
          Go to tasks
        </Button>
      </div>
    </section>
  );
}
