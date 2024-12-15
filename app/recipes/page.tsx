import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Recipes() {
  const recipeCategories = [
    { title: "Breakfast", description: "Start your day with nutritious vegan meals" },
    { title: "Lunch", description: "Quick and easy plant-based lunch ideas" },
    { title: "Dinner", description: "Hearty and satisfying vegan dinner recipes" },
    { title: "Snacks", description: "Healthy vegan snacks for any time of day" },
    { title: "Desserts", description: "Indulgent vegan desserts to satisfy your sweet tooth" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Vegan Recipes</h1>
      <p className="text-xl">Discover delicious and nutritious plant-based recipes for every meal.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipeCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

