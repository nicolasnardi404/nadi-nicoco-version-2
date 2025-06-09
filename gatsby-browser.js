// Track when loading started
let loadStartTime

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
  // Just wait for the fixed time
  if (typeof window !== "undefined") {
    setTimeout(() => {
      removeLoading()
    }, 800)
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
