import rhinoLogo from '../../../assets/logo-small.svg';
const SplashScreen = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flash-blink">
        <img
          src={rhinoLogo}
          alt="Rhino Logo"
          className="object-contain w-14 h-14"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
