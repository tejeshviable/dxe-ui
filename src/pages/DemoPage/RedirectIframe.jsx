import React, { useState, useEffect } from "react";

const RedirectIframe = ({ redirectUrl, handleSuccess }) => {
  const [iframeUrl, setIframeUrl] = useState(null);

  const openRedirectIframe = (redirectUrl) => {
    console.log(redirectUrl);

    // Parse the URL
    const parsedUrl = new URL(redirectUrl);

    // Extract the 'state' parameter
    const state = parsedUrl.searchParams.get("state");

    // Set iframe URL
    setIframeUrl(redirectUrl);

    // Simulate success after the iframe loads
    setTimeout(() => {
      handleSuccess(state);
    }, 500); // Adjust delay as per your success logic
  };

  useEffect(() => {
    if (redirectUrl) {
      openRedirectIframe(redirectUrl);
    }
  }, [redirectUrl]);

  return (
    <div style={{ display: "none" }}> {/* Keeps the iframe hidden */}
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          title="Redirect Iframe"
          style={{ width: "0", height: "0", border: "none" }}
        ></iframe>
      )}
    </div>
  );
};

export default RedirectIframe;