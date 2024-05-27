// Listenn for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide Results
  document.getElementById("result").style.display = "none"
  // Show Loader
  document.getElementById("loading").style.display = "block"

  setTimeout(calculateResult, 2000)
  e.preventDefault()
})

// Calculate Result

function calculateResult(e) {
  console.log("Calculating....")

  // UI Vars
  const amount = document.getElementById("amount")
  const interest = document.getElementById("interest")
  const years = document.getElementById("years")
  const monthlyPayment = document.getElementById("monthly-payment")
  const totalPayment = document.getElementById("total-peyment")
  const totalInterest = document.getElementById("total-interest")

  const principal = parseFloat(amount.value)
  const calculatedIntresent = parseFloat(interest.value) / 100 / 12
  const calculatedPayment = parseFloat(years.value) * 12

  // Compute monthly payment
  const x = Math.pow(1 + calculatedIntresent, calculatedPayment)
  const monthly = (principal * x * calculatedIntresent) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayment).toFixed()
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2)

    // Show result
    document.getElementById("result").style.display = "block"

    // Hode Loader
    document.getElementById("loading").style.display = "none"
  } else {
    // console.log("Please check the number")
    showError("Please check your numbers")
  }
}

// Show Error

function showError(error) {
  // Hide result
  document.getElementById("result").style.display = "none"

  // Hide Loader
  document.getElementById("loading").style.display = "none"
  // create a div
  const errorDiv = document.createElement("div")

  // Get elements
  const card = document.querySelector(".card")
  const heading = document.querySelector(".heading")

  // Add class
  errorDiv.className = "alert alert-danger"

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error))

  // Insert error above heading
  card.insertBefore(errorDiv, heading)

  // Clear error after 3 second

  setTimeout(clearError, 700)
}
function clearError() {
  document.querySelector(".alert").remove()
}
