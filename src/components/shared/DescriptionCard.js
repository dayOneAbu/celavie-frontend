import classNames from "classnames";
function DescriptionCard({ data }) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-2 space-y-16">
        {data.map((feature, featureIdx) => (
          <div
            key={feature.name}
            className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
          >
            <div
              className={classNames(
                featureIdx % 2 === 0
                  ? "lg:col-start-1"
                  : "lg:col-start-8 xl:col-start-9",
                "mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4"
              )}
            >
              <h3 className="text-lg font-medium text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {feature.description}
              </p>
            </div>
            <div
              className={classNames(
                featureIdx % 2 === 0
                  ? "lg:col-start-6 xl:col-start-5"
                  : "lg:col-start-1",
                "flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8"
              )}
            >
              <div className="aspect-w-5 aspect-h-2 rounded-lg bg-gray-100 overflow-hidden">
                <img
                  src={feature.imageSrc}
                  alt={feature.imageAlt}
                  className="object-center object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DescriptionCard;
