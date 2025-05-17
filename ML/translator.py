import argostranslate.package
import argostranslate.translate

# Ensure language package is installed
def ensure_language_installed(from_code, to_code):
    # Check if already installed
    installed_languages = argostranslate.translate.get_installed_languages()
    from_lang = next((lang for lang in installed_languages if lang.code == from_code), None)
    to_lang = next((lang for lang in installed_languages if lang.code == to_code), None)

    if from_lang and to_lang:
        return  # Already installed

    # Install missing language pair
    argostranslate.package.update_package_index()
    available_packages = argostranslate.package.get_available_packages()
    package_to_install = next(
        (pkg for pkg in available_packages if pkg.from_code == from_code and pkg.to_code == to_code),
        None
    )

    if not package_to_install:
        raise ValueError(f"No translation package available for {from_code} → {to_code}")

    argostranslate.package.install_from_path(package_to_install.download())
    argostranslate.translate.load_installed_languages()

# Translate function to be imported
def translate_text(text, from_lang="en", to_lang="hi"):
    ensure_language_installed(from_lang, to_lang)

    installed_languages = argostranslate.translate.get_installed_languages()
    from_lang_obj = next((lang for lang in installed_languages if lang.code == from_lang), None)
    to_lang_obj = next((lang for lang in installed_languages if lang.code == to_lang), None)

    if not from_lang_obj or not to_lang_obj:
        raise ValueError("Unsupported language pair.")

    translation = from_lang_obj.get_translation(to_lang_obj)
    return translation.translate(text)
