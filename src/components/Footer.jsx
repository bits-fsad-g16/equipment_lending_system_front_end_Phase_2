// import React from "react";
// import { Container } from "react-bootstrap";

// function Footer() {
//   return (
//     <footer className="bg-dark text-light py-3 text-center fixed-bottom">
//   <small>© 2025 All rights reserved</small>
// </footer>

//   );
// }

// export default Footer;

import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto" role="contentinfo" aria-label="Footer">
      <Container fluid className="text-center">
        <small>&copy; 2025 All rights reserved</small>
      </Container>
    </footer>
  );
}

export default Footer;

