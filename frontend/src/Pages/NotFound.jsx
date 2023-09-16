import Navbar from "../Components/Navbar";

function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-foreground/90 mb-4">
          404 &ndash; Page Not Found
        </h1>
        <p className="text-lg text-foreground/60 mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
