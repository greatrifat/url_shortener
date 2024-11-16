import { redirect } from 'next/navigation';

 // Update path based on your project
import connectDB from '../../../connection/mongoose';
import URL from '../../../model/url';


// Server component with redirect logic
export default async function RedirectHandler({ params }) {
  const { id } = await params;  // Extract the URL ID from dynamic route params


    await connectDB();  // Ensure database connection

    // Fetch the URL entry based on the provided `id`
    const urlEntry = await URL.findOne({ urlId: id });
    if (urlEntry) {
        await URL.updateOne(
          {
            urlId: id,
          },
          {
            $inc: { accessCount: 1 },
          }
        );
    }



    if (!urlEntry) {
      // If URL is not found, handle the case (could be a custom 404 page)
      return (
        <div>
          <h1>404 - URL Not Found</h1>
          <p>The URL you are looking for does not exist.</p>
        </div>
      );
    }

    // Redirect to the original URL
    redirect(urlEntry.originalUrl);  // This triggers the redirection

    
}
