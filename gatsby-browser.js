// Remove loading screen and show content
const removeLoading = () => {
  const initialLoading = document.getElementById("gatsby-initial-loading")
  const gatsbyRoot = document.getElementById("___gatsby")

  if (initialLoading && gatsbyRoot) {
    // Fade out loading screen
    initialLoading.style.opacity = "0"
    initialLoading.style.transition = "opacity 0.3s ease-out"

    // Show content
    setTimeout(() => {
      gatsbyRoot.classList.add("loaded")
      // Remove loading screen after transition
      setTimeout(() => {
        initialLoading.remove()
      }, 300)
    }, 300)
  }
}

export const onInitialClientRender = () => {
  // Wait for fonts and images to load
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
      removeLoading()
    })
  }
}

// Handle subsequent route changes
export const onRouteUpdate = () => {
  const gatsbyRoot = document.getElementById("___gatsby")
  if (gatsbyRoot) {
    gatsbyRoot.classList.add("loaded")
  }
}
