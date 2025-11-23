import os
import sys

def check_setup():
    """Check if setup is complete"""
    print(" AgroBuddy ML Integration Setup Checker\n")
    print("=" * 50)
    
    checks = {
        "ML Service Directory": os.path.exists("ml-service"),
        "ML Service app.py": os.path.exists("ml-service/app.py"),
        "ML Service requirements": os.path.exists("ml-service/requirements.txt"),
        "Model Directory": os.path.exists("ml-service/model"),
        "Model File (.h5)": os.path.exists("ml-service/model/plant_disease_model.h5"),
        "Model File (.keras)": os.path.exists("ml-service/model/plant_disease_model.keras"),
        "Backend Directory": os.path.exists("backend"),
        "Backend server.js": os.path.exists("backend/server.js"),
        "Backend .env": os.path.exists("backend/.env"),
    }
    
    passed = 0
    failed = 0
    
    for check, result in checks.items():
        status = "" if result else "❌"
        print(f"{status} {check}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print("\n" + "=" * 50)
    print(f"Checks Passed: {passed}/{len(checks)}")
    
    # Check if model exists in either format
    model_exists = checks["Model File (.h5)"] or checks["Model File (.keras)"]
    
    if not model_exists:
        print("\n  MODEL NOT FOUND!")
        print("\n To download your model from Google Colab:")
        print("   1. In Colab, run: model.save('plant_disease_model.h5')")
        print("   2. Run: from google.colab import files")
        print("   3. Run: files.download('plant_disease_model.h5')")
        print("   4. Place downloaded file in: ml-service/model/")
        return False
    
    if failed > 2:  # Allow model to be missing initially
        print("\n  Setup incomplete! Please check missing items above.")
        return False
    
    print("\n Setup looks good!")
    print("\n Next Steps:")
    print("   1. Install ML dependencies: cd ml-service && pip install -r requirements.txt")
    print("   2. Start ML Service: python app.py")
    print("   3. Start Backend: cd backend && npm run dev")
    print("   4. Start Frontend: npx expo start")
    
    return True

if __name__ == "__main__":
    # Check if running from project root
    if not os.path.exists("package.json"):
        print("  Please run this script from the project root directory")
        print("   cd plant-disease-app && python check_setup.py")
        sys.exit(1)
    
    check_setup()
