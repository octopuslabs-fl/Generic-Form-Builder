## Cuestionario - Diagnóstico de Compliance

**Ley 21.719 (Datos Personales) + Ley 21.663 (Ciberseguridad)**

-----

### **A. INVENTARIO Y MAPEO DE DATOS**

1. ¿Tienen inventario documentado de todos los sistemas que procesan datos personales? (ERP, CRM, RRHH, etc.)

- [ ] Sí, completo y actualizado
- [ ] Parcial / desactualizado
- [ ] No existe

1. ¿Cuántos sistemas/aplicaciones core manejan datos personales? ___
1. ¿Tienen diagramados los flujos de datos personales (DFD - Data Flow Diagrams)?

- [ ] Sí, documentados
- [ ] No

1. ¿Dónde residen los datos personales?

- [ ] On-premise
- [ ] Cloud público (especificar: AWS / Azure / GCP / otro: ___)
- [ ] Híbrido
- [ ] No sabemos con certeza

1. ¿Tienen registro de qué datos personales recolectan por categoría? (básicos, sensibles, biométricos)

- [ ] Sí, categorizado
- [ ] Parcial
- [ ] No

-----

### **B. BASES LEGALES Y CONSENTIMIENTOS**

1. ¿Cómo capturan consentimientos actualmente?

- [ ] Sistema automatizado con logs
- [ ] Formularios manuales/papel
- [ ] No tenemos proceso formal
- [ ] No capturamos consentimientos

1. ¿Los consentimientos actuales cumplen requisitos de Ley 21.719? (expreso, previo, informado, específico, libre)

- [ ] Sí
- [ ] No estamos seguros
- [ ] No

1. ¿Tienen identificada la base legal para cada tratamiento de datos? (consentimiento, contrato, ley, interés legítimo)

- [ ] Sí, documentado
- [ ] No

-----

### **C. SEGURIDAD DE LA INFORMACIÓN**

1. ¿Tienen implementado un Sistema de Gestión de Seguridad de la Información (SGSI)?

- [ ] Sí, certificado (ISO 27001 u otro)
- [ ] En implementación
- [ ] No

1. ¿Tienen designado un CISO (Chief Information Security Officer)?

- [ ] Sí, dedicado
- [ ] Sí, pero con otras funciones
- [ ] No

1. Cifrado de datos:

- En tránsito: [ ] Sí [ ] No [ ] Parcial
- En reposo: [ ] Sí [ ] No [ ] Parcial
- Backups: [ ] Sí [ ] No [ ] Parcial

1. Control de accesos:

- [ ] RBAC implementado y documentado
- [ ] Control básico (usuarios/contraseñas)
- [ ] Sin control formal

1. ¿MFA (autenticación multifactor) obligatorio para acceso a sistemas críticos?

- [ ] Sí, todos los sistemas
- [ ] Solo algunos
- [ ] No

1. ¿Tienen SIEM o herramienta de monitoreo de seguridad centralizada?

- [ ] Sí (especificar: ___)
- [ ] No

1. ¿Logs de auditoría: están centralizados y protegidos contra modificación?

- [ ] Sí
- [ ] Parcial
- [ ] No

1. ¿Tiempo de retención de logs? ___
1. ¿Tienen plan de respuesta a incidentes documentado?

- [ ] Sí, documentado y probado
- [ ] Documentado pero no probado
- [ ] No existe

1. ¿Pueden detectar y reportar una brecha de datos en 72 horas?

- [ ] Sí, tenemos capacidad
- [ ] Probablemente no
- [ ] Definitivamente no

-----

### **D. GESTIÓN DE TERCEROS Y TRANSFERENCIAS**

1. ¿Cuántos proveedores/subcontratistas procesan datos personales? ___
1. ¿Tienen contratos DPA (Data Processing Agreements) firmados con procesadores de datos?

- [ ] Sí, con todos
- [ ] Con algunos
- [ ] No

1. Transferencias internacionales de datos:

- ¿A qué países? ___
- [ ] No transferimos al extranjero
- ¿Bajo qué mecanismo legal? (cláusulas contractuales, país adecuado, etc.)
  - [ ] Tenemos mecanismo formal
  - [ ] No tenemos mecanismo

-----

### **E. DERECHOS DE LOS TITULARES (ARCO)**

1. ¿Tienen proceso documentado para atender solicitudes ARCO? (Acceso, Rectificación, Cancelación, Oposición, Portabilidad)

- [ ] Sí, automatizado
- [ ] Sí, manual
- [ ] No

1. ¿Cuánto tiempo les tomaría borrar completamente los datos de una persona de TODOS los sistemas (incluidos backups)?

- [ ] <15 días
- [ ] 15-30 días
- [ ] >30 días
- [ ] No lo sabemos / No podemos hacerlo

1. ¿Pueden exportar datos de un titular en formato estructurado (portabilidad)?

- [ ] Sí
- [ ] No

-----

### **F. POLÍTICAS Y PROCEDIMIENTOS**

1. ¿Tienen Política de Privacidad actualizada según Ley 21.719?

- [ ] Sí
- [ ] En revisión
- [ ] No

1. ¿Políticas de retención de datos documentadas por categoría?

- [ ] Sí, documentadas
- [ ] No

1. ¿Tienen proceso de evaluación de impacto (DPIA) para tratamientos de alto riesgo?

- [ ] Sí, implementado
- [ ] No conocemos el proceso

1. ¿Personal capacitado en protección de datos y ciberseguridad?

- [ ] Sí, programa formal
- [ ] Capacitaciones esporádicas
- [ ] No

1. ¿Tienen designado (o piensan designar) un DPO (Data Protection Officer)?

- [ ] Ya tenemos
- [ ] Planeamos hacerlo
- [ ] No sabemos si es obligatorio

-----

### **G. CUMPLIMIENTO NORMATIVO ACTUAL**

1. ¿Actualmente cumplen con algún estándar de privacidad/seguridad?

- [ ] ISO 27001
- [ ] SOC 2
- [ ] PCI-DSS
- [ ] Otro: ___
- [ ] Ninguno

1. ¿Han tenido incidentes de seguridad o brechas de datos en los últimos 2 años?

- [ ] Sí (cantidad: ___)
- [ ] No

1. ¿Han recibido multas o sanciones relacionadas con datos personales o ciberseguridad?

- [ ] Sí
- [ ] No

-----

### **H. ALCANCE DEL PROYECTO**

1. Número aproximado de:

- Empleados: ___
- Registros de clientes/usuarios: ___
- Registros de proveedores: ___

1. ¿Cuántas áreas/departamentos procesan datos personales? ___
1. Presupuesto estimado asignado para compliance: ___

- [ ] <$20M CLP
- [ ] $20-50M CLP
- [ ] $50-100M CLP
- [ ] >$100M CLP
- [ ] Por definir

1. Timeline deseado para estar compliance:

- [ ] Antes de jun 2026
- [ ] Jun-dic 2026
- [ ] No tenemos urgencia

-----

### **I. PRIORIDADES Y EXPECTATIVAS**

1. ¿Cuál es su mayor preocupación? (rankear 1-3)

- [ ] Multas/sanciones
- [ ] Reputación
- [ ] Complejidad técnica
- [ ] Costo

1. ¿Qué esperan de la consultoría? (marcar todas las que apliquen)

- [ ] GAP analysis completo
- [ ] Implementación técnica
- [ ] Documentación y políticas
- [ ] Capacitación
- [ ] Acompañamiento continuo post-implementación
- [ ] Auditorías periódicas

1. Del 0-10, ¿dónde creen que están hoy en términos de readiness? ___

-----

**Datos de Contacto del Responsable:**

- Nombre: ___
- Cargo: ___
- Email: ___
- Teléfono: ___​​​​​​​​​​​​​​