import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./api-doc";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <div className="py-6 bg-white">
      <section className="container">
        <ReactSwagger spec={spec} url="/swagger.json" />
      </section>
    </div>
  );
}
