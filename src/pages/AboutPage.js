import { DescriptionCard, Layout } from "../components";
import banner from "../asset/banner.jpg";
import celavie1 from "../asset/celavi about.jpg";
import celavie2 from "../asset/celavi about2.jpg";
import celavie3 from "../asset/cozy place.jpg";
import Banner from "../components/shared/Banner";

const features = [
  {
    name: "friendly Staff with excellent food",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem reprehenderit maxime dolores doloremque? Repellat, harum inventore,",
    imageSrc: celavie1,
    imageAlt:
      "White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.",
  },
  {
    name: "ready to deliver 24/7",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem reprehenderit maxime dolores doloremque? Repellat, harum inventore,",
    imageSrc: celavie2,
    imageAlt: "Detail of zipper pull with tan leather and silver rivet.",
  },
  {
    name: "cozy and warm environment",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem reprehenderit maxime dolores doloremque? Repellat, harum inventore,",
    imageSrc: celavie3,
    imageAlt: "Detail of zipper pull with tan leather and silver rivet.",
  },
];

function AboutPage() {
  return (
    <Layout>
      <Banner
        className={"rounded-2xl mx-2 overflow-hidden mt-2"}
        imageLink={banner}
      />
      <DescriptionCard data={features} />
    </Layout>
  );
}

export default AboutPage;
