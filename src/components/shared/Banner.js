function Banner({ imageLink, className }) {
  return (
    <div className={className}>
      <img
        src={imageLink}
        alt=""
        className="w-full h-full md:object-center object-cover md:object-contain"
      />
    </div>
  );
}
export default Banner;
