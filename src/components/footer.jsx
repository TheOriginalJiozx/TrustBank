function Footer() {
  return (
    <footer className="w-full py-6 px-6 bg-white/20 backdrop-blur-md mt-10 text-center text-black-800 font-medium shadow-inner">
      &copy; {new Date().getFullYear()} TrustBank. Alle rettigheder forbeholdes.
    </footer>
  );
}

export default Footer;