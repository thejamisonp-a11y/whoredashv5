// Helper script to seed the database with sample data
import { sql } from "@neondatabase/serverless"

export async function seedDatabase() {
  const client = sql(NEON_DATABASE_URL)

  try {
    // Insert sample companions
    await client`
      INSERT INTO companions (
        display_name, category, age, location, bio, rate_per_hour, 
        avatar_url, images, rating, total_reviews, available, verified
      ) VALUES 
      (
        'Sophia Martinez',
        'women',
        26,
        'Miami, FL',
        'Adventurous spirit with a love for the ocean and fine dining. Let me show you the best of Miami nightlife.',
        150,
        '/professional-latina-woman-portrait.png',
        ARRAY[
          '/woman-beach-sunset.png',
          '/elegant-woman-at-restaurant.jpg',
          '/woman-in-evening-dress.jpg'
        ],
        4.9,
        47,
        true,
        true
      ),
      (
        'Isabella Chen',
        'women',
        24,
        'Los Angeles, CA',
        'Art enthusiast and foodie. I love exploring galleries, trying new restaurants, and meaningful conversations.',
        175,
        '/professional-asian-woman.png',
        ARRAY[
          '/woman-art-gallery.png',
          '/woman-at-upscale-restaurant.jpg',
          '/woman-in-cocktail-dress.jpg'
        ],
        4.8,
        52,
        true,
        true
      ),
      (
        'Marcus Johnson',
        'men',
        29,
        'New York, NY',
        'Fitness enthusiast and entrepreneur. Whether it is a business event or a night out, I bring energy and charm.',
        200,
        '/professional-black-man-portrait.png',
        ARRAY[
          '/man-in-suit-at-event.jpg',
          '/athletic-man-outdoors.jpg',
          '/man-at-upscale-venue.jpg'
        ],
        4.7,
        38,
        true,
        true
      )
      ON CONFLICT DO NOTHING
    `

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  }
}
