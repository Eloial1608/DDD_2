import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;


void main() {
  runApp(const BancoApp());
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCALITZACIONS
// ─────────────────────────────────────────────────────────────────────────────

class AppLocalizations {
  final String langCode;
  const AppLocalizations(this.langCode);

  static const Map<String, Map<String, String>> _t = {
    'ca': {
      'appTitle': 'Neo Banc el teu banc digital',
      'appName': 'Neo Banc\nel teu banc digital',
      'login': 'Iniciar Sessió',
      'noAccount': "No tens compte? Registra't aquí",
      'email': 'Email',
      'password': 'Contrasenya',
      'enterEmail': 'Introdueix el teu email',
      'enterPassword': 'Introdueix la teva contrasenya',
      'invalidCredentials': 'Email o contrasenya incorrectes',
      'wrongCredentials': 'Email o contrasenya incorrectes',
      'register': 'Crear Compte',
      'registerTitle': 'Crear Compte',
      'fullName': 'Nom Complet',
      'enterName': 'Introdueix el teu nom',
      'username': 'Nom d\'usuari',
      'enterUsername': 'Introdueix el teu nom d\'usuari',
      'usernameNoSpaces': 'Sense espais',
      'invalidEmail': 'Email invàlid',
      'minChars': 'Mínim 6 caràcters',
      'confirmPassword': 'Confirmar Contrasenya',
      'enterConfirmPassword': 'Confirma la teva contrasenya',
      'passwordMismatch': 'Les contrasenyes no coincideixen',
      'confirmPasswordEmpty': 'Confirma la teva contrasenya',
      'emailExists': 'Aquest email ja està registrat',
      'registerSuccess': 'Registre exitós! Ara pots iniciar sessió',
      'required': 'Camp obligatori',
      'logout': 'Tancar Sessió',
      'hello': 'Hola',
      'availableBalance': 'Saldo disponible',
      'lastMovements': 'Últims moviments',
      'send': 'Enviar',
      'pay': 'Pagar',
      'recharge': 'Recarregar',
      'home': 'Inici',
      'transactions': 'Transaccions',
      'bills': 'Factures',
      'card': 'Targeta',
      'incomes': 'Ingressos',
      'expenses': 'Despeses',
      'noMovements': 'Sense moviments',
      'newTransfer': 'Nova Transferència',
      'recipientEmail': 'Email destinatari',
      'amount': 'Import (€)',
      'concept': 'Concepte',
      'invalidAmount': 'Import invàlid',
      'insufficientBalance': 'Saldo insuficient',
      'cancel': 'Cancel·lar',
      'transferOk': 'Transferència realitzada correctament',
      'transferTo': 'Transferència a',
      'pending': 'Pendents',
      'totalPending': 'Total pendent',
      'payBill': 'Pagar',
      'paid': 'Pagada',
      'billPaidOk': 'pagada correctament',
      'insufficientBalanceBill': 'Saldo insuficient per pagar aquesta factura',
      'company': 'Empresa',
      'dueDate': 'Venciment',
      'confirmPayment': 'Confirmar pagament',
      'cardStatus': 'Estat de la targeta',
      'cardActive': 'Targeta activa',
      'cardBlocked': 'Targeta bloquejada',
      'cardActiveDesc': 'Pots fer pagaments',
      'cardBlockedDesc': 'No pots fer pagaments',
      'cardActivated': 'Targeta activada',
      'cardBlockedMsg': 'Targeta bloquejada',
      'spendingLimit': 'Límit de despesa',
      'monthlyLimit': 'Límit mensual',
      'perMonth': '/ mes',
      'changeLimit': 'Canviar límit de despesa',
      'newLimit': 'Nou límit (€)',
      'save': 'Guardar',
      'limitUpdated': 'Límit actualitzat',
      'options': 'Opcions',
      'notificationsTitle': 'Notificacions de pagaments',
      'notificationsDesc': 'Rebràs un avís per cada pagament',
      'abroadTitle': "Pagaments a l'estranger",
      'abroadDesc': "Activa per usar-la fora d'Espanya",
      'nfcTitle': 'Pagament sense contacte (NFC)',
      'nfcDesc': 'Per a pagaments sense inserir la targeta',
      'requestCard': 'Sol·licitar nova targeta física',
      'requestCardOk': 'Sol·licitud enviada. Rebràs la targeta en 5-7 dies hàbils.',
      'initialDeposit': 'Dipòsit inicial',
      'receivedTransfer': 'Transferència rebuda',
      'servicePayment': 'Pagament de serveis',
      'facturaBill': 'Factura',
      'language': 'Idioma',
      'newPayment': 'Nou Pagament',
      'fromAccount': 'Compte origen',
      'toAccount': 'Compte destinatari (IBAN o email)',
      'paymentReason': 'Motiu del pagament',
      'reasonMortgage': 'Hipoteca',
      'reasonRent': 'Lloguer',
      'reasonDebt': 'Deute',
      'reasonTaxes': 'Impostos',
      'reasonInsurance': 'Assegurança',
      'reasonOther': 'Altre',
      'otherReason': 'Especifica el motiu...',
      'paymentOk': 'Pagament realitzat correctament',
      'paymentTo': 'Pagament a',
      'selectReason': 'Selecciona un motiu o especifica\'l',
      'currentAccount': 'Compte corrent',
      'registerStep1': 'Pas 1 de 2 – Dades d\'accés',
      'registerStep2': 'Pas 2 de 2 – Dades personals',
      'next': 'Següent',
      'documentType': 'Tipus de document',
      'documentNumber': 'Número de document',
      'enterDocumentNumber': 'Introdueix el número',
      'dni': 'DNI',
      'nie': 'NIE',
      'passport': 'Passaport',
      'selectDocumentType': 'Selecciona el tipus',
      'birthDate': 'Data de naixement',
      'birthDay': 'Dia',
      'birthMonth': 'Mes',
      'birthYear': 'Any',
      'selectDay': 'Dia',
      'selectMonth': 'Mes',
      'selectYear': 'Any',
      'phone': 'Telèfon',
      'enterPhone': 'Introdueix el telèfon',
      'address': 'Adreça',
      'enterAddress': 'Introdueix l\'adreça',
      'locality': 'Localitat',
      'enterLocality': 'Introdueix la localitat',
      'country': 'Companyia',
      'enterCountry': 'Introdueix la companyia',
      'postalCode': 'Codi postal',
      'enterPostalCode': 'Introdueix el codi postal',
      'selectBirthDate': 'Selecciona la data de naixement completa',
      'invalidPhone': 'Telèfon invàlid',
      'invalidPostalCode': 'Codi postal invàlid',
      'verifyPasswordTitle': 'Verificació de seguretat',
      'verifyPasswordDesc': 'Introdueix la teva contrasenya per veure les dades sensibles de la targeta.',
      'verifyPasswordHint': 'Contrasenya',
      'verifyPasswordBtn': 'Verificar',
      'verifyPasswordWrong': 'Contrasenya incorrecta',
      'myProfile': 'El meu Perfil',
      'loadingProfile': 'Carregant perfil...',
      'errorLoadingProfile': 'Error al carregar el perfil',
      'tryAgain': 'Reintentar',
      'personalData': 'Dades personals',
      'identityDocument': 'Document d\'identitat',
      'birthDateLabel': 'Data de naixement',
      'phoneNumber': 'Telèfon',
      'addressLabel': 'Adreça',
      'cityLabel': 'Ciutat',
      'zipCodeLabel': 'Codi postal',
      'companyLabel': 'Empresa',
      'isAdmin': 'Administrador',
      'yes': 'Sí',
      'no': 'No',
      'comingSoon': 'Properament disponible',
      'editProfile': 'Editar Perfil',
      'profile': 'Perfil',
      'city': 'Ciutat',
      'enterCity': 'Introdueix la ciutat',
      'invalidZIpCode': 'Codi postal invàlid',
    },
    'es': {
      'appTitle': 'Neo Banc tu banco digital',
      'appName': 'Neo Banc\ntu banco digital',
      'login': 'Iniciar Sesión',
      'noAccount': '¿No tienes cuenta? Regístrate aquí',
      'email': 'Email',
      'password': 'Contraseña',
      'enterEmail': 'Introduce tu email',
      'enterPassword': 'Introduce tu contraseña',
      'invalidCredentials': 'Email o contraseña incorrectos',
      'wrongCredentials': 'Email o contraseña incorrectos',
      'register': 'Crear Cuenta',
      'registerTitle': 'Crear Cuenta',
      'fullName': 'Nombre Completo',
      'enterName': 'Introduce tu nombre',
      'username': 'Nombre de usuario',
      'enterUsername': 'Introduce tu nombre de usuario',
      'usernameNoSpaces': 'Sin espacios',
      'invalidEmail': 'Email inválido',
      'minChars': 'Mínimo 6 caracteres',
      'confirmPassword': 'Confirmar Contraseña',
      'enterConfirmPassword': 'Confirma tu contraseña',
      'passwordMismatch': 'Las contraseñas no coinciden',
      'confirmPasswordEmpty': 'Confirma tu contraseña',
      'emailExists': 'Este email ya está registrado',
      'registerSuccess': '¡Registro exitoso! Ahora puedes iniciar sesión',
      'required': 'Campo obligatorio',
      'logout': 'Cerrar Sesión',
      'hello': 'Hola',
      'availableBalance': 'Saldo disponible',
      'lastMovements': 'Últimos movimientos',
      'send': 'Enviar',
      'pay': 'Pagar',
      'recharge': 'Recargar',
      'home': 'Inicio',
      'transactions': 'Transacciones',
      'bills': 'Facturas',
      'card': 'Tarjeta',
      'incomes': 'Ingresos',
      'expenses': 'Gastos',
      'noMovements': 'Sin movimientos',
      'newTransfer': 'Nueva Transferencia',
      'recipientEmail': 'Email destinatario',
      'amount': 'Importe (€)',
      'concept': 'Concepto',
      'invalidAmount': 'Importe inválido',
      'insufficientBalance': 'Saldo insuficiente',
      'cancel': 'Cancelar',
      'transferOk': 'Transferencia realizada correctamente',
      'transferTo': 'Transferencia a',
      'pending': 'Pendientes',
      'totalPending': 'Total pendiente',
      'payBill': 'Pagar',
      'paid': 'Pagada',
      'billPaidOk': 'pagada correctamente',
      'insufficientBalanceBill': 'Saldo insuficiente para pagar esta factura',
      'company': 'Empresa',
      'dueDate': 'Vencimiento',
      'confirmPayment': 'Confirmar pago',
      'cardStatus': 'Estado de la tarjeta',
      'cardActive': 'Tarjeta activa',
      'cardBlocked': 'Tarjeta bloqueada',
      'cardActiveDesc': 'Puedes hacer pagos',
      'cardBlockedDesc': 'No puedes hacer pagos',
      'cardActivated': 'Tarjeta activada',
      'cardBlockedMsg': 'Tarjeta bloqueada',
      'spendingLimit': 'Límite de gasto',
      'monthlyLimit': 'Límite mensual',
      'perMonth': '/ mes',
      'changeLimit': 'Cambiar límite de gasto',
      'newLimit': 'Nuevo límite (€)',
      'save': 'Guardar',
      'limitUpdated': 'Límite actualizado',
      'options': 'Opciones',
      'notificationsTitle': 'Notificaciones de pagos',
      'notificationsDesc': 'Recibirás un aviso por cada pago',
      'abroadTitle': 'Pagos en el extranjero',
      'abroadDesc': 'Activa para usarla fuera de España',
      'nfcTitle': 'Pago sin contacto (NFC)',
      'nfcDesc': 'Para pagos sin insertar la tarjeta',
      'requestCard': 'Solicitar nueva tarjeta física',
      'requestCardOk': 'Solicitud enviada. Recibirás la tarjeta en 5-7 días hábiles.',
      'initialDeposit': 'Depósito inicial',
      'receivedTransfer': 'Transferencia recibida',
      'servicePayment': 'Pago de servicios',
      'facturaBill': 'Factura',
      'language': 'Idioma',
      'newPayment': 'Nuevo Pago',
      'fromAccount': 'Cuenta origen',
      'toAccount': 'Cuenta destinataria (IBAN o email)',
      'paymentReason': 'Motivo del pago',
      'reasonMortgage': 'Hipoteca',
      'reasonRent': 'Alquiler',
      'reasonDebt': 'Deuda',
      'reasonTaxes': 'Impuestos',
      'reasonInsurance': 'Seguro',
      'reasonOther': 'Otro',
      'otherReason': 'Especifica el motivo...',
      'paymentOk': 'Pago realizado correctamente',
      'paymentTo': 'Pago a',
      'selectReason': 'Selecciona un motivo o especifícalo',
      'currentAccount': 'Cuenta corriente',
      'registerStep1': 'Paso 1 de 2 – Datos de acceso',
      'registerStep2': 'Paso 2 de 2 – Datos personales',
      'next': 'Siguiente',
      'documentType': 'Tipo de documento',
      'documentNumber': 'Número de documento',
      'enterDocumentNumber': 'Introduce el número',
      'dni': 'DNI',
      'nie': 'NIE',
      'passport': 'Pasaporte',
      'selectDocumentType': 'Selecciona el tipo',
      'birthDate': 'Fecha de nacimiento',
      'birthDay': 'Día',
      'birthMonth': 'Mes',
      'birthYear': 'Año',
      'selectDay': 'Día',
      'selectMonth': 'Mes',
      'selectYear': 'Año',
      'phone': 'Teléfono',
      'enterPhone': 'Introduce el teléfono',
      'address': 'Dirección',
      'enterAddress': 'Introduce la dirección',
      'locality': 'Localidad',
      'enterLocality': 'Introduce la localidad',
      'country': 'Compañia',
      'enterCountry': 'Introduce la compañia',
      'postalCode': 'Código postal',
      'enterPostalCode': 'Introduce el código postal',
      'selectBirthDate': 'Selecciona la fecha de nacimiento completa',
      'invalidPhone': 'Teléfono inválido',
      'invalidPostalCode': 'Código postal inválido',
      'verifyPasswordTitle': 'Verificación de seguridad',
      'verifyPasswordDesc': 'Introduce tu contraseña para ver los datos sensibles de la tarjeta.',
      'verifyPasswordHint': 'Contraseña',
      'verifyPasswordBtn': 'Verificar',
      'verifyPasswordWrong': 'Contraseña incorrecta',
      'myProfile': 'Mi Perfil',
      'loadingProfile': 'Cargando perfil...',
      'errorLoadingProfile': 'Error al cargar el perfil',
      'tryAgain': 'Reintentar',
      'personalData': 'Datos personales',
      'identityDocument': 'Documento de identidad',
      'birthDateLabel': 'Fecha de nacimiento',
      'phoneNumber': 'Teléfono',
      'addressLabel': 'Dirección',
      'cityLabel': 'Ciudad',
      'zipCodeLabel': 'Código postal',
      'companyLabel': 'Empresa',
      'isAdmin': 'Administrador',
      'yes': 'Sí',
      'no': 'No',
      'comingSoon': 'Próximamente disponible',
      'editProfile': 'Editar Perfil',
      'profile': 'Perfil',
      'city': 'Ciudad',
      'enterCity': 'Introduce la ciudad',
      'invalidZIpCode': 'Código postal inválido',
    },
    'en': {
      'appTitle': 'Neo Bank your digital bank',
      'appName': 'Neo Bank\nyour digital bank',
      'login': 'Log In',
      'noAccount': "Don't have an account? Sign up here",
      'email': 'Email',
      'password': 'Password',
      'enterEmail': 'Enter your email',
      'enterPassword': 'Enter your password',
      'invalidCredentials': 'Incorrect email or password',
      'wrongCredentials': 'Incorrect email or password',
      'register': 'Create Account',
      'registerTitle': 'Create Account',
      'fullName': 'Full Name',
      'enterName': 'Enter your name',
      'username': 'Username',
      'enterUsername': 'Enter your username',
      'usernameNoSpaces': 'No spaces allowed',
      'invalidEmail': 'Invalid email',
      'minChars': 'Minimum 6 characters',
      'confirmPassword': 'Confirm Password',
      'enterConfirmPassword': 'Please confirm your password',
      'passwordMismatch': 'Passwords do not match',
      'confirmPasswordEmpty': 'Please confirm your password',
      'emailExists': 'This email is already registered',
      'registerSuccess': 'Registration successful! You can now log in',
      'required': 'Required field',
      'logout': 'Log Out',
      'hello': 'Hello',
      'availableBalance': 'Available balance',
      'lastMovements': 'Recent movements',
      'send': 'Send',
      'pay': 'Pay',
      'recharge': 'Top up',
      'home': 'Home',
      'transactions': 'Transactions',
      'bills': 'Bills',
      'card': 'Card',
      'incomes': 'Income',
      'expenses': 'Expenses',
      'noMovements': 'No movements',
      'newTransfer': 'New Transfer',
      'recipientEmail': 'Recipient email',
      'amount': 'Amount (€)',
      'concept': 'Reference',
      'invalidAmount': 'Invalid amount',
      'insufficientBalance': 'Insufficient balance',
      'cancel': 'Cancel',
      'transferOk': 'Transfer completed successfully',
      'transferTo': 'Transfer to',
      'pending': 'Pending',
      'totalPending': 'Total pending',
      'payBill': 'Pay',
      'paid': 'Paid',
      'billPaidOk': 'paid successfully',
      'insufficientBalanceBill': 'Insufficient balance to pay this bill',
      'company': 'Company',
      'dueDate': 'Due date',
      'confirmPayment': 'Confirm payment',
      'cardStatus': 'Card status',
      'cardActive': 'Card active',
      'cardBlocked': 'Card blocked',
      'cardActiveDesc': 'You can make payments',
      'cardBlockedDesc': 'Payments are disabled',
      'cardActivated': 'Card activated',
      'cardBlockedMsg': 'Card blocked',
      'spendingLimit': 'Spending limit',
      'monthlyLimit': 'Monthly limit',
      'perMonth': '/ month',
      'changeLimit': 'Change spending limit',
      'newLimit': 'New limit (€)',
      'save': 'Save',
      'limitUpdated': 'Limit updated',
      'options': 'Options',
      'notificationsTitle': 'Payment notifications',
      'notificationsDesc': 'You will receive an alert for each payment',
      'abroadTitle': 'International payments',
      'abroadDesc': 'Enable to use it outside Spain',
      'nfcTitle': 'Contactless payment (NFC)',
      'nfcDesc': 'For payments without inserting the card',
      'requestCard': 'Request new physical card',
      'requestCardOk': 'Request sent. You will receive the card in 5-7 business days.',
      'initialDeposit': 'Initial deposit',
      'receivedTransfer': 'Transfer received',
      'servicePayment': 'Service payment',
      'facturaBill': 'Bill',
      'language': 'Language',
      'newPayment': 'New Payment',
      'fromAccount': 'Source account',
      'toAccount': 'Recipient account (IBAN or email)',
      'paymentReason': 'Payment reason',
      'reasonMortgage': 'Mortgage',
      'reasonRent': 'Rent',
      'reasonDebt': 'Debt',
      'reasonTaxes': 'Taxes',
      'reasonInsurance': 'Insurance',
      'reasonOther': 'Other',
      'otherReason': 'Specify the reason...',
      'paymentOk': 'Payment completed successfully',
      'paymentTo': 'Payment to',
      'selectReason': 'Select a reason or specify it',
      'currentAccount': 'Current account',
      'registerStep1': 'Step 1 of 2 – Access data',
      'registerStep2': 'Step 2 of 2 – Personal data',
      'next': 'Next',
      'documentType': 'Document type',
      'documentNumber': 'Document number',
      'enterDocumentNumber': 'Enter the number',
      'dni': 'DNI',
      'nie': 'NIE',
      'passport': 'Passport',
      'selectDocumentType': 'Select type',
      'birthDate': 'Date of birth',
      'birthDay': 'Day',
      'birthMonth': 'Month',
      'birthYear': 'Year',
      'selectDay': 'Day',
      'selectMonth': 'Month',
      'selectYear': 'Year',
      'phone': 'Phone',
      'enterPhone': 'Enter phone number',
      'address': 'Address',
      'enterAddress': 'Enter address',
      'locality': 'Locality',
      'enterLocality': 'Enter locality',
      'country': 'Company',
      'enterCountry': 'Enter company',
      'postalCode': 'Postal code',
      'enterPostalCode': 'Enter postal code',
      'selectBirthDate': 'Please select a complete date of birth',
      'invalidPhone': 'Invalid phone number',
      'invalidPostalCode': 'Invalid postal code',
      'verifyPasswordTitle': 'Security verification',
      'verifyPasswordDesc': 'Enter your password to view sensitive card data.',
      'verifyPasswordHint': 'Password',
      'verifyPasswordBtn': 'Verify',
      'verifyPasswordWrong': 'Incorrect password',
      'myProfile': 'My Profile',
      'loadingProfile': 'Loading profile...',
      'errorLoadingProfile': 'Error loading profile',
      'tryAgain': 'Try Again',
      'personalData': 'Personal data',
      'identityDocument': 'Identity document',
      'birthDateLabel': 'Date of birth',
      'phoneNumber': 'Phone number',
      'addressLabel': 'Address',
      'cityLabel': 'City',
      'zipCodeLabel': 'Postal code',
      'companyLabel': 'Company',
      'isAdmin': 'Administrator',
      'yes': 'Yes',
      'no': 'No',
      'comingSoon': 'Coming soon',
      'editProfile': 'Edit Profile',
      'profile': 'Profile',
      'city': 'City',
      'enterCity': 'Enter the city',
      'invalidZIpCode': 'Invalid postal code',
    },
  };

  String get(String key) => _t[langCode]?[key] ?? _t['ca']![key] ?? key;
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCALE PROVIDER (InheritedWidget)
// ─────────────────────────────────────────────────────────────────────────────

class LocaleProvider extends InheritedWidget {
  final String langCode;
  final void Function(String) setLang;
  final AppLocalizations loc;

  const LocaleProvider({
    Key? key,
    required this.langCode,
    required this.setLang,
    required this.loc,
    required Widget child,
  }) : super(key: key, child: child);

  static LocaleProvider of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<LocaleProvider>()!;
  }

  @override
  bool updateShouldNotify(LocaleProvider old) => langCode != old.langCode;
}

// ─────────────────────────────────────────────────────────────────────────────
// BANCOAPP
// ─────────────────────────────────────────────────────────────────────────────

class BancoApp extends StatefulWidget {
  const BancoApp({Key? key}) : super(key: key);

  @override
  State<BancoApp> createState() => _BancoAppState();
}

class _BancoAppState extends State<BancoApp> {
  String _langCode = 'ca';

  void _setLang(String code) => setState(() => _langCode = code);

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations(_langCode);
    return LocaleProvider(
      langCode: _langCode,
      setLang: _setLang,
      loc: loc,
      child: MaterialApp(
        title: loc.get('appTitle'),
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: const PantallaLogin(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WIDGET SELECTOR D'IDIOMA
// ─────────────────────────────────────────────────────────────────────────────

class LanguageSelector extends StatelessWidget {
  const LanguageSelector({Key? key}) : super(key: key);

  static const _languages = [
    {'code': 'ca', 'flag': '🏳️‍🌈', 'name': 'Català'},
    {'code': 'es', 'flag': '🇪🇸', 'name': 'Castellano'},
    {'code': 'en', 'flag': '🇬🇧', 'name': 'English'},
  ];

  @override
  Widget build(BuildContext context) {
    final provider = LocaleProvider.of(context);
    final currentCode = provider.langCode;
    final flagMap = {'ca': '🏴', 'es': '🇪🇸', 'en': '🇬🇧'};

    return PopupMenuButton<String>(
      onSelected: provider.setLang,
      tooltip: provider.loc.get('language'),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(flagMap[currentCode] ?? '🌐', style: const TextStyle(fontSize: 20)),
            const SizedBox(width: 4),
            Text(
              currentCode.toUpperCase(),
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
            ),
            const Icon(Icons.arrow_drop_down, color: Colors.white, size: 18),
          ],
        ),
      ),
      itemBuilder: (_) => _languages.map((lang) {
        final isSelected = lang['code'] == currentCode;
        return PopupMenuItem<String>(
          value: lang['code'],
          child: Row(
            children: [
              Text(flagMap[lang['code']] ?? '🌐', style: const TextStyle(fontSize: 20)),
              const SizedBox(width: 12),
              Text(
                lang['name']!,
                style: TextStyle(
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                  color: isSelected ? Colors.blue[700] : Colors.black87,
                ),
              ),
              if (isSelected) ...[
                const Spacer(),
                Icon(Icons.check, color: Colors.blue[700], size: 18),
              ],
            ],
          ),
        );
      }).toList(),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICIO API
// ─────────────────────────────────────────────────────────────────────────────

class ApiService {
  static const String baseUrl = 'http://localhost:5008/v1';

  static String? _token;
  static Map<String, String> get _headers => {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $_token',
      };

  static Future<bool> createUser({
    required String name,
    required String username,
    required String email,
    required String password,
    bool isAdmin = false,
    required String identityDocType,
    required String identityDocNumber,
    required String phoneNumber,
    required String birthDate,
    required String address,
    required String city,
    required String zipCode,
    String companyName = '',
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/users'),
        headers: _headers,
        body: jsonEncode({
          'name': name,
          'username': username,
          'email': email,
          'password': password,
          'isAdmin': isAdmin,
          'identityDocType': identityDocType,
          'identityDocNumber': identityDocNumber,
          'companyName': companyName,
          'phoneNumber': phoneNumber,
          'birthDate': birthDate,
          'address': address,
          'city': city,
          'zipCode': zipCode,
        }),
      );

      debugPrint(response.body);
      return response.statusCode == 201;
    } catch (e) {
      debugPrint('Error creando usuario en API: $e');
      return false;
    }
  }

  static Future<Map<String, dynamic>?> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: _headers,
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      debugPrint('Login response: ${response.body}');

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        _token = data['token'];
        return data;
      } else {
        debugPrint('Login failed: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      debugPrint('Error en login: $e');
      return null;
    }
  }

  static Future<List<dynamic>> getUsers() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/users'), headers: _headers);
      if (response.statusCode == 200) {
        return jsonDecode(response.body) as List<dynamic>;
      }
    } catch (e) {
      debugPrint('Error obteniendo usuarios: $e');
    }
    return [];
  }

  static Future<Map<String, dynamic>?> getUser(String id) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/users/$id'), headers: _headers);
      if (response.statusCode == 200) {
        return jsonDecode(response.body) as Map<String, dynamic>;
      }
    } catch (e) {
      debugPrint('Error obteniendo usuario: $e');
    }
    return null;
  }

  static Future<bool> updateUser(String id, Map<String, dynamic> data) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/users/$id'),
        headers: _headers,
        body: jsonEncode(data),
      );
      return response.statusCode == 201;
    } catch (e) {
      debugPrint('Error actualizando usuario: $e');
      return false;
    }
  }

  static Future<bool> deleteUser(String id) async {
    try {
      final response = await http.delete(Uri.parse('$baseUrl/users/$id'), headers: _headers);
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      debugPrint('Error eliminando usuario: $e');
      return false;
    }
  }

  static Future<Map<String, dynamic>?> getMe() async {
    try {
      debugPrint('Token enviado: $_token');
      final response = await http.get(
        Uri.parse('$baseUrl/me'),
        headers: _headers,
      );

      debugPrint('Response status: ${response.statusCode}');
      debugPrint('Response body: ${response.body}');
      debugPrint('Response body length: ${response.body.length}');

      if (response.statusCode == 200) {
        if (response.body.isEmpty) {
          debugPrint('Error: Response body is empty');
          return null;
        }
        return jsonDecode(response.body) as Map<String, dynamic>;
      } else {
        debugPrint('Get profile failed: ${response.statusCode}');
        debugPrint('Error response: ${response.body}');
        return null;
      }
    } catch (e) {
      debugPrint('Error obteniendo perfil: $e');
      return null;
    }
  }

  static Future<bool> createAccount({
    required String userId,
    required String typeAccount,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/account'),
        headers: _headers,
        body: jsonEncode({'userId': userId, 'type_account': typeAccount}),
      );
      return response.statusCode == 201;
    } catch (e) {
      debugPrint('Error creando cuenta: $e');
      return false;
    }
  }

  static Future<Map<String, dynamic>?> getAccount(String id) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/account/$id'), headers: _headers);
      if (response.statusCode == 200) {
        return jsonDecode(response.body) as Map<String, dynamic>;
      }
    } catch (e) {
      debugPrint('Error obteniendo cuenta: $e');
    }
    return null;
  }

  static Future<bool> createCard({
    required String typeCard,
    required String cardPin,
    required String accountId,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/Card'),
        headers: _headers,
        body: jsonEncode({'type_Card': typeCard, 'cardPin': cardPin, 'accountId': accountId}),
      );
      return response.statusCode == 201;
    } catch (e) {
      debugPrint('Error creando tarjeta: $e');
      return false;
    }
  }

  static Future<List<dynamic>> getCards() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/Cards'), headers: _headers);
      if (response.statusCode == 200) {
        return jsonDecode(response.body) as List<dynamic>;
      }
    } catch (e) {
      debugPrint('Error obteniendo tarjetas: $e');
    }
    return [];
  }

  static Future<bool> createTransaction({
    required String type,
    required double amount,
    required String fromAccountId,
    required String toAccountId,
    required String concept,
    required String reference,
    String? authToken,
  }) async {
    try {
      final headers = Map<String, String>.from(_headers);
      if (authToken != null) headers['Authorization'] = 'Bearer $authToken';
      final response = await http.post(
        Uri.parse('$baseUrl/transactions'),
        headers: headers,
        body: jsonEncode({
          'type': type,
          'amount': amount,
          'fromAccountId': fromAccountId,
          'toAccountId': toAccountId,
          'concept': concept,
          'reference': reference,
        }),
      );
      return response.statusCode == 201;
    } catch (e) {
      debugPrint('Error creando transaccion: $e');
      return false;
    }
  }

  static Future<List<dynamic>> getTransactions() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/transactions'), headers: _headers);
      if (response.statusCode == 200) {
        return jsonDecode(response.body) as List<dynamic>;
      }
    } catch (e) {
      debugPrint('Error obteniendo transacciones: $e');
    }
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODELOS
// ─────────────────────────────────────────────────────────────────────────────

class Usuario {
  final String nombre;
  final String username;
  final String email;
  final String password;
  String? apiId;
  final String identityDocType;
  final String identityDocNumber;
  final String phoneNumber;
  final String address;
  final String city;
  final String zipCode;
  final String birthDate;
  final String companyName;
  final bool isAdmin;

  Usuario({
    required this.nombre,
    required this.username,
    required this.email,
    required this.password,
    this.apiId,
    this.identityDocType = '',
    this.identityDocNumber = '',
    this.phoneNumber = '',
    this.address = '',
    this.city = '',
    this.zipCode = '',
    this.birthDate = '',
    this.companyName = '',
    this.isAdmin = false,
  });
}

enum TipoMovimiento { ingreso, gasto, transferencia }

class Movimiento {
  final String descripcion;
  final double importe;
  final DateTime fecha;
  final TipoMovimiento tipo;
  final bool isKey;

  Movimiento({
    required this.descripcion,
    required this.importe,
    required this.fecha,
    required this.tipo,
    this.isKey = true,
  });
}

class TarjetaVirtual {
  final String numero;
  final String titular;
  final String caducidad;
  final String cvv;
  bool activa;
  double limiteGasto;

  TarjetaVirtual({
    required this.numero,
    required this.titular,
    required this.caducidad,
    required this.cvv,
    this.activa = true,
    this.limiteGasto = 2000.0,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// DADES GLOBALS
// ─────────────────────────────────────────────────────────────────────────────

List<Usuario> usuariosRegistrados = [];

// ─────────────────────────────────────────────────────────────────────────────
// PANTALLA DE LOGIN
// ─────────────────────────────────────────────────────────────────────────────

class PantallaLogin extends StatefulWidget {
  const PantallaLogin({Key? key}) : super(key: key);

  @override
  State<PantallaLogin> createState() => _PantallaLoginState();
}

class _PantallaLoginState extends State<PantallaLogin> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _ocultarPassword = true;
  bool _isLoading = false;

  void _iniciarSesion(AppLocalizations loc) async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    final result = await ApiService.login(
      email: _emailController.text.trim(),
      password: _passwordController.text.trim(),
    );

    setState(() => _isLoading = false);

    if (result != null) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const PantallaPrincipal()),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(loc.get('invalidCredentials')),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final loc = LocaleProvider.of(context).loc;

    return Scaffold(
      backgroundColor: Colors.blue[50],
      appBar: AppBar(
        backgroundColor: Colors.blue[700],
        elevation: 0,
        actions: const [LanguageSelector()],
      ),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.account_balance, size: 80, color: Colors.blue[800]),
                  const SizedBox(height: 16),
                  Text(
                    loc.get('appName'),
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Colors.blue[800],
                    ),
                  ),
                  const SizedBox(height: 40),
                  _buildTextField(
                    controller: _emailController,
                    label: loc.get('email'),
                    icon: Icons.email,
                    keyboardType: TextInputType.emailAddress,
                    validator: (v) => (v == null || v.isEmpty) ? loc.get('enterEmail') : null,
                  ),
                  const SizedBox(height: 16),
                  _buildPasswordField(
                    controller: _passwordController,
                    label: loc.get('password'),
                    obscure: _ocultarPassword,
                    onToggle: () => setState(() => _ocultarPassword = !_ocultarPassword),
                    validator: (v) => (v == null || v.isEmpty) ? loc.get('enterPassword') : null,
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton(
                      onPressed: _isLoading ? null : () => _iniciarSesion(loc),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue[700],
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: _isLoading
                          ? const CircularProgressIndicator(color: Colors.white)
                          : Text(loc.get('login'),
                              style: const TextStyle(fontSize: 18, color: Colors.white)),
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextButton(
                    onPressed: () => Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const PantallaRegistro()),
                    ),
                    child: Text(loc.get('noAccount'), style: TextStyle(color: Colors.blue[700])),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        filled: true,
        fillColor: Colors.white,
      ),
      validator: validator,
    );
  }

  Widget _buildPasswordField({
    required TextEditingController controller,
    required String label,
    required bool obscure,
    required VoidCallback onToggle,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      obscureText: obscure,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: const Icon(Icons.lock),
        suffixIcon: IconButton(
          icon: Icon(obscure ? Icons.visibility : Icons.visibility_off),
          onPressed: onToggle,
        ),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        filled: true,
        fillColor: Colors.white,
      ),
      validator: validator,
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PANTALLA DE REGISTRE – PÀG 1 (dades d'accés)
// ─────────────────────────────────────────────────────────────────────────────

class PantallaRegistro extends StatefulWidget {
  const PantallaRegistro({Key? key}) : super(key: key);

  @override
  State<PantallaRegistro> createState() => _PantallaRegistroState();
}

class _PantallaRegistroState extends State<PantallaRegistro> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _ocultarPassword = true;
  bool _ocultarConfirmar = true;

  void _continuar(AppLocalizations loc) {
    if (_formKey.currentState!.validate()) {
      bool emailExiste = usuariosRegistrados.any((u) => u.email == _emailController.text);
      if (emailExiste) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(loc.get('emailExists')), backgroundColor: Colors.orange),
        );
        return;
      }
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => PantallaRegistro2(
            name: _nameController.text,
            username: _usernameController.text,
            email: _emailController.text,
            password: _passwordController.text,
          ),
        ),
      );
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _usernameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final loc = LocaleProvider.of(context).loc;
    return Scaffold(
      backgroundColor: Colors.blue[50],
      appBar: AppBar(
        title: Text(loc.get('registerTitle')),
        backgroundColor: Colors.blue[700],
        foregroundColor: Colors.white,
        actions: const [LanguageSelector()],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                const SizedBox(height: 12),
                _StepIndicator(currentStep: 1, totalSteps: 2),
                const SizedBox(height: 4),
                Text(
                  loc.get('registerStep1'),
                  style: TextStyle(
                    fontSize: 13,
                    color: Colors.blue[700],
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 20),
                Icon(Icons.person_add, size: 60, color: Colors.blue[800]),
                const SizedBox(height: 20),
                _buildTextField(_nameController, loc.get('fullName'), Icons.person,
                    validator: (v) => (v == null || v.isEmpty) ? loc.get('enterName') : null),
                const SizedBox(height: 16),
                _buildTextField(_usernameController, loc.get('username'), Icons.alternate_email,
                    validator: (v) {
                      if (v == null || v.isEmpty) return loc.get('required');
                      if (v.contains(' ')) return loc.get('usernameNoSpaces');
                      return null;
                    }),
                const SizedBox(height: 16),
                _buildTextField(
                  _emailController,
                  loc.get('email'),
                  Icons.email,
                  keyboardType: TextInputType.emailAddress,
                  validator: (v) {
                    if (v == null || v.isEmpty) return loc.get('enterEmail');
                    if (!v.contains('@')) return loc.get('invalidEmail');
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                _buildPasswordField(_passwordController, loc.get('password'), _ocultarPassword,
                    () => setState(() => _ocultarPassword = !_ocultarPassword),
                    validator: (v) {
                      if (v == null || v.isEmpty) return loc.get('enterPassword');
                      if (v.length < 6) return loc.get('minChars');
                      return null;
                    }),
                const SizedBox(height: 16),
                _buildPasswordField(_confirmPasswordController, loc.get('confirmPassword'), _ocultarConfirmar,
                    () => setState(() => _ocultarConfirmar = !_ocultarConfirmar),
                    validator: (v) {
                      if (v == null || v.isEmpty) return loc.get('enterConfirmPassword');
                      if (v != _passwordController.text) return loc.get('passwordMismatch');
                      return null;
                    }),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton.icon(
                    onPressed: () => _continuar(loc),
                    icon: const Icon(Icons.arrow_forward, color: Colors.white),
                    label: Text(loc.get('next'),
                        style: const TextStyle(fontSize: 18, color: Colors.white)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue[700],
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(TextEditingController ctrl, String label, IconData icon,
      {TextInputType? keyboardType, String? Function(String?)? validator}) {
    return TextFormField(
      controller: ctrl,
      keyboardType: keyboardType,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        filled: true,
        fillColor: Colors.white,
      ),
      validator: validator,
    );
  }

  Widget _buildPasswordField(TextEditingController ctrl, String label, bool ocultar,
      VoidCallback toggle,
      {IconData icon = Icons.lock, String? Function(String?)? validator}) {
    return TextFormField(
      controller: ctrl,
      obscureText: ocultar,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        suffixIcon: IconButton(
          icon: Icon(ocultar ? Icons.visibility : Icons.visibility_off),
          onPressed: toggle,
        ),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        filled: true,
        fillColor: Colors.white,
      ),
      validator: validator,
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PANTALLA DE REGISTRE – PÀG 2 (dades personals)
// ─────────────────────────────────────────────────────────────────────────────

class PantallaRegistro2 extends StatefulWidget {
  final String name;
  final String username;
  final String email;
  final String password;

  const PantallaRegistro2({
    Key? key,
    required this.name,
    required this.username,
    required this.email,
    required this.password,
  }) : super(key: key);

  @override
  State<PantallaRegistro2> createState() => _PantallaRegistro2State();
}

class _PantallaRegistro2State extends State<PantallaRegistro2> {
  final _formKey = GlobalKey<FormState>();

  final _identityDocController = TextEditingController();
  final _birthDateController = TextEditingController();
  final _phoneController = TextEditingController();
  final _addressController = TextEditingController();
  final _cityController = TextEditingController();
  final _countryController = TextEditingController();
  final _zipCodeController = TextEditingController();
  final _companyNameController = TextEditingController();

  String? _documentType;
  bool _isLoading = false;

  void _registrar(AppLocalizations loc) async {
    if (_documentType == null || _documentType!.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(loc.get('selectDocumentType')),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    const docTypeMap = {
      'DNI': 'dni',
      'CIF': 'cif',
      'NIE': 'nie',
      'PASSPORT': 'passport',
    };
    final identityDoc = docTypeMap[_documentType]!;

    final apiSuccess = await ApiService.createUser(
      name: widget.name,
      username: widget.username,
      email: widget.email,
      password: widget.password,
      identityDocType: identityDoc,
      identityDocNumber: _identityDocController.text,
      phoneNumber: _phoneController.text,
      birthDate: _birthDateController.text,
      address: _addressController.text,
      city: _cityController.text,
      zipCode: _zipCodeController.text,
      companyName: _companyNameController.text,
    );

    setState(() => _isLoading = false);

    if (apiSuccess) {
      debugPrint('Usuario creado en la API correctamente');
    } else {
      debugPrint('No se pudo crear en la API, guardado solo localmente');
    }

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(loc.get('registerSuccess')),
        backgroundColor: Colors.green,
      ),
    );

    Navigator.popUntil(context, (route) => route.isFirst);
  }

  @override
  void dispose() {
    _identityDocController.dispose();
    _birthDateController.dispose();
    _phoneController.dispose();
    _addressController.dispose();
    _cityController.dispose();
    _countryController.dispose();
    _zipCodeController.dispose();
    _companyNameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final loc = LocaleProvider.of(context).loc;

    final docTypes = [
      {'key': 'DNI', 'icon': Icons.badge},
      {'key': 'CIF', 'icon': Icons.assignment_ind},
      {'key': 'NIE', 'icon': Icons.menu_book},
      {'key': 'PASSPORT', 'icon': Icons.menu_book},
    ];

    return Scaffold(
      backgroundColor: Colors.blue[50],
      appBar: AppBar(
        title: Text(loc.get('registerTitle')),
        backgroundColor: Colors.blue[700],
        foregroundColor: Colors.white,
        actions: const [LanguageSelector()],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _StepIndicator(currentStep: 2, totalSteps: 2),
                const SizedBox(height: 4),
                Center(
                  child: Text(
                    loc.get('registerStep2'),
                    style: TextStyle(
                      fontSize: 13,
                      color: Colors.blue[700],
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                _sectionLabel(loc.get('documentType')),
                const SizedBox(height: 10),
                Row(
                  children: docTypes.map((doc) {
                    final key = doc['key'] as String;
                    final icon = doc['icon'] as IconData;
                    final isSelected = _documentType == key;
                    return Expanded(
                      child: GestureDetector(
                        onTap: () => setState(() => _documentType = key),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 180),
                          margin: const EdgeInsets.only(right: 8),
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          decoration: BoxDecoration(
                            color: isSelected ? Colors.blue[700] : Colors.white,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: isSelected ? Colors.blue[700]! : Colors.grey[300]!,
                              width: 1.5,
                            ),
                            boxShadow: isSelected
                                ? [BoxShadow(
                                    color: Colors.blue.withOpacity(0.25),
                                    blurRadius: 6,
                                    offset: const Offset(0, 3),
                                  )]
                                : [],
                          ),
                          child: Column(
                            children: [
                              Icon(icon,
                                  color: isSelected ? Colors.white : Colors.blue[700], size: 26),
                              const SizedBox(height: 6),
                              Text(
                                key,
                                style: TextStyle(
                                  color: isSelected ? Colors.white : Colors.grey[800],
                                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
                if (_documentType == null)
                  Padding(
                    padding: const EdgeInsets.only(top: 6, left: 4),
                    child: Text(
                      loc.get('selectDocumentType'),
                      style: const TextStyle(color: Colors.grey, fontSize: 12),
                    ),
                  ),
                const SizedBox(height: 20),
                _sectionLabel(loc.get('documentNumber')),
                const SizedBox(height: 8),
                _buildTextField(
                  _identityDocController,
                  loc.get('enterDocumentNumber'),
                  Icons.numbers,
                  validator: (v) => (v == null || v.isEmpty) ? loc.get('required') : null,
                ),
                const SizedBox(height: 20),
                _sectionLabel(loc.get('birthDate')),
                const SizedBox(height: 8),
                _buildTextField(
                  _birthDateController,
                  'YYYY-MM-DD',
                  Icons.calendar_today,
                  keyboardType: TextInputType.datetime,
                  validator: (v) {
                    if (v == null || v.isEmpty) return loc.get('required');
                    final regex = RegExp(r'^\d{4}-\d{2}-\d{2}$');
                    if (!regex.hasMatch(v)) return 'Format: YYYY-MM-DD';
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                _sectionLabel(loc.get('phone')),
                const SizedBox(height: 8),
                _buildTextField(
                  _phoneController,
                  loc.get('enterPhone'),
                  Icons.phone,
                  keyboardType: TextInputType.phone,
                  validator: (v) {
                    if (v == null || v.isEmpty) return loc.get('required');
                    if (v.replaceAll(RegExp(r'[\s\+\-]'), '').length < 7) {
                      return loc.get('invalidPhone');
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                _sectionLabel(loc.get('address')),
                const SizedBox(height: 8),
                _buildTextField(
                  _addressController,
                  loc.get('enterAddress'),
                  Icons.home,
                  validator: (v) => (v == null || v.isEmpty) ? loc.get('required') : null,
                ),
                const SizedBox(height: 20),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 3,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _sectionLabel(loc.get('city')),
                          const SizedBox(height: 8),
                          _buildTextField(
                            _cityController,
                            loc.get('enterCity'),
                            Icons.location_city,
                            validator: (v) =>
                                (v == null || v.isEmpty) ? loc.get('required') : null,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      flex: 2,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _sectionLabel(loc.get('postalCode')),
                          const SizedBox(height: 8),
                          _buildTextField(
                            _zipCodeController,
                            loc.get('enterPostalCode'),
                            Icons.markunread_mailbox,
                            keyboardType: TextInputType.number,
                            validator: (v) {
                              if (v == null || v.isEmpty) return loc.get('required');
                              if (v.length < 4) return loc.get('invalidZIpCode');
                              return null;
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                _sectionLabel(loc.get('country')),
                const SizedBox(height: 8),
                _buildTextField(
                  _countryController,
                  loc.get('enterCountry'),
                  Icons.public,
                  validator: (v) => (v == null || v.isEmpty) ? loc.get('required') : null,
                ),
                const SizedBox(height: 32),
                SizedBox(
                  width: double.infinity,
                  height: 54,
                  child: ElevatedButton.icon(
                    onPressed: _isLoading ? null : () => _registrar(loc),
                    icon: _isLoading
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : const Icon(Icons.check_circle, color: Colors.white),
                    label: Text(loc.get('register'),
                        style: const TextStyle(fontSize: 18, color: Colors.white)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue[700],
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(
    TextEditingController ctrl,
    String hint,
    IconData icon, {
    TextInputType? keyboardType,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: ctrl,
      keyboardType: keyboardType,
      textCapitalization:
          hint.contains('document') ? TextCapitalization.characters : TextCapitalization.none,
      decoration: InputDecoration(
        hintText: hint,
        prefixIcon: Icon(icon),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        filled: true,
        fillColor: Colors.white,
      ),
      validator: validator,
    );
  }

  Widget _sectionLabel(String text) {
    return Text(
      text,
      style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Colors.grey[700]),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WIDGET AUXILIAR: INDICADOR DE PAS
// ─────────────────────────────────────────────────────────────────────────────

class _StepIndicator extends StatelessWidget {
  final int currentStep;
  final int totalSteps;

  const _StepIndicator({required this.currentStep, required this.totalSteps});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(totalSteps, (i) {
        final stepNum = i + 1;
        final isActive = stepNum == currentStep;
        final isDone = stepNum < currentStep;
        return Row(
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 250),
              width: isActive ? 32 : 28,
              height: isActive ? 32 : 28,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isActive
                    ? Colors.blue[700]
                    : isDone
                        ? Colors.green[600]
                        : Colors.grey[300],
              ),
              child: Center(
                child: isDone
                    ? const Icon(Icons.check, color: Colors.white, size: 16)
                    : Text(
                        '$stepNum',
                        style: TextStyle(
                          color: isActive ? Colors.white : Colors.grey[600],
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
              ),
            ),
            if (i < totalSteps - 1)
              Container(
                width: 40,
                height: 2,
                color: isDone ? Colors.green[400] : Colors.grey[300],
              ),
          ],
        );
      }),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PANTALLA PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

class PantallaPrincipal extends StatefulWidget {
  const PantallaPrincipal({Key? key}) : super(key: key);

  @override
  State<PantallaPrincipal> createState() => _PantallaPrincipalState();
}

class _PantallaPrincipalState extends State<PantallaPrincipal> {
  @override
  Widget build(BuildContext context) {
    final loc = LocaleProvider.of(context).loc;

    return Scaffold(
      backgroundColor: const Color(0xFFE3F2FD),
      appBar: AppBar(
        title: const Text('Banc App'),
        backgroundColor: const Color(0xFF1976D2),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            tooltip: loc.get('profile'),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const PantallaPerifil()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: loc.get('logout'),
            onPressed: () {
              Navigator.pushReplacementNamed(context, '/login');
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            Text(
              'Benvingut/da a Banc App!',
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
                color: Colors.blue[800],
              ),
            ),
            const SizedBox(height: 10),
            Text(
              'Gestiona els teus comptes i operacions',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PANTALLA DE PERFIL
// ─────────────────────────────────────────────────────────────────────────────

class PantallaPerifil extends StatefulWidget {
  const PantallaPerifil({Key? key}) : super(key: key);

  @override
  State<PantallaPerifil> createState() => _PantallaPerfilState();
}

class _PantallaPerfilState extends State<PantallaPerifil> {
  late Future<Map<String, dynamic>?> _userFuture;

  @override
  void initState() {
    super.initState();
    _userFuture = ApiService.getMe();
  }

  @override
  Widget build(BuildContext context) {
    final loc = LocaleProvider.of(context).loc;

    return Scaffold(
      backgroundColor: Colors.blue[50],
      appBar: AppBar(
        title: Text(loc.get('myProfile')),
        backgroundColor: Colors.blue[700],
        foregroundColor: Colors.white,
        actions: const [LanguageSelector()],
      ),
      body: FutureBuilder<Map<String, dynamic>?>(
        future: _userFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const CircularProgressIndicator(),
                  const SizedBox(height: 16),
                  Text(loc.get('loadingProfile')),
                ],
              ),
            );
          }

          if (snapshot.hasError || snapshot.data == null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.error_outline, size: 64, color: Colors.red[400]),
                  const SizedBox(height: 16),
                  Text(loc.get('errorLoadingProfile')),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: () {
                      setState(() {
                        _userFuture = ApiService.getMe();
                      });
                    },
                    child: Text(loc.get('tryAgain')),
                  ),
                ],
              ),
            );
          }

          final user = snapshot.data!;

          return SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Column(
                    children: [
                      CircleAvatar(
                        radius: 50,
                        backgroundColor: Colors.blue[700],
                        child: Text(
                          (user['name']?.toString() ?? 'U')[0].toUpperCase(),
                          style: const TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        user['name'] ?? 'N/A',
                        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        '@${user['username'] ?? 'N/A'}',
                        style: TextStyle(fontSize: 14, color: Colors.grey[600]),
                      ),
                      Text(
                        user['email'] ?? 'N/A',
                        style: TextStyle(fontSize: 13, color: Colors.grey[500]),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
                _buildSectionTitle(loc.get('personalData')),
                const SizedBox(height: 12),
                _buildDataRow(
                  loc.get('identityDocument'),
                  '${user['identityDocType'] ?? 'N/A'} - ${user['identityDocNumber'] ?? 'N/A'}',
                ),
                _buildDataRow(loc.get('birthDateLabel'), user['birthDate'] ?? 'N/A'),
                _buildDataRow(loc.get('phoneNumber'), user['phoneNumber'] ?? 'N/A'),
                const SizedBox(height: 20),
                _buildSectionTitle(loc.get('address')),
                const SizedBox(height: 12),
                _buildDataRow(loc.get('addressLabel'), user['address'] ?? 'N/A'),
                _buildDataRow(loc.get('cityLabel'), user['city'] ?? 'N/A'),
                _buildDataRow(loc.get('zipCodeLabel'), user['zipcode'] ?? 'N/A'),
                const SizedBox(height: 20),
                _buildSectionTitle(loc.get('companyLabel')),
                const SizedBox(height: 12),
                _buildDataRow(loc.get('companyLabel'), user['companyName'] ?? 'N/A'),
                _buildDataRow(
                  loc.get('isAdmin'),
                  (user['isAdmin'] == true ? loc.get('yes') : loc.get('no')) ?? 'No',
                ),
                const SizedBox(height: 32),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(loc.get('comingSoon')),
                          backgroundColor: Colors.blue[700],
                        ),
                      );
                    },
                    icon: const Icon(Icons.edit, color: Colors.white),
                    label: Text(
                      loc.get('editProfile'),
                      style: const TextStyle(fontSize: 16, color: Colors.white),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue[700],
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.bold,
        color: Colors.blue[700],
      ),
    );
  }

  Widget _buildDataRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: Colors.grey[700],
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}
