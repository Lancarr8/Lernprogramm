import { useRouter } from "./router.jsx";
import LandingScreen from "./screens/LandingScreen.jsx";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import LernfeldScreen from "./screens/LernfeldScreen.jsx";
import FlowController from "./screens/flow/FlowController.jsx";

export default function App() {
  const { screen, context, navigate } = useRouter();

  if (screen === "landing") return <LandingScreen navigate={navigate} />;
  if (screen === "dashboard") return <DashboardScreen navigate={navigate} />;
  if (screen === "lernfeld") return <LernfeldScreen navigate={navigate} context={context} />;
  if (screen === "flow") return <FlowController navigate={navigate} context={context} />;

  return (
    <div
      className="grid-bg"
      style={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ color: "var(--c-teal)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
        Unbekannter Screen: {screen}
      </span>
    </div>
  );
}
