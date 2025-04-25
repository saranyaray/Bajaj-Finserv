const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t border-neutral-200 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-primary mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">DocFinder</span>
          </div>
          <div className="text-sm text-neutral-400">
            © {new Date().getFullYear()} DocFinder. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
