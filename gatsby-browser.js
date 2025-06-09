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
    }, 1000) // Increased to 1 second
  }
}

export const onInitialClientRender = () => {
  // Remove loading screen when React has loaded
  if (typeof window !== "undefined") {
    // Wait for 1 second before starting to remove the loading screen
    setTimeout(() => {
      const loadingScreen = document.getElementById("gatsby-initial-loading")
      if (loadingScreen) {
        loadingScreen.style.opacity = "0"
        setTimeout(() => {
          loadingScreen.remove()
        }, 300)
      }
    }, 1200)
  }
}

// Handle page transitions
export const onRouteUpdate = () => {
  // Show content after a slight delay
  setTimeout(() => {
    const gatsbyRoot = document.getElementById("___gatsby")
    if (gatsbyRoot) {
      gatsbyRoot.style.opacity = "1"
    }
  }, 300)
}
