### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Dependencias
* Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/en-us/free/search/?&ef_id=Cj0KCQiA2ITuBRDkARIsAMK9Q7MuvuTqIfK15LWfaM7bLL_QsBbC5XhJJezUbcfx-qAnfPjH568chTMaAkAsEALw_wcB:G:s&OCID=AID2000068_SEM_alOkB9ZE&MarinID=alOkB9ZE_368060503322_%2Bazure_b_c__79187603991_kwd-23159435208&lnkd=Google_Azure_Brand&dclid=CjgKEAiA2ITuBRDchty8lqPlzS4SJAC3x4k1mAxU7XNhWdOSESfffUnMNjLWcAIuikQnj3C4U8xRG_D_BwE). Al hacerlo usted contará con $200 USD para gastar durante 1 mes.

### Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las  imagenes.

![](images/part3/part3-function-config.png)

![](images/part3/part3-function-configii.png)

2. Instale la extensión de **Azure Functions** para Visual Studio Code.

![](images/part3/part3-install-extension.png)

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

![](images/part3/part3-deploy-function-1.png)

![](images/part3/part3-deploy-function-2.png)

4. Dirijase al portal de Azure y pruebe la function.

![](images/part3/part3-test-function.png)

5. Modifique la coleción de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

    Se enviaron 10 peticiones concurrentes de la siguiente manera:
    
![](https://media.discordapp.net/attachments/742236419757703229/775558915706454016/carbon-16.png?width=396&height=471)

Se obtuvieron los siguientes resultados:

![](https://media.discordapp.net/attachments/742236419757703229/775557854429315102/Screen_Shot_2020-11-06_at_7.13.53_PM.png?width=347&height=471)

6. Cree una nueva Function que resuleva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?.
    
    Se implementó una función recursiva con memorización de la siguiente manera:
    
    ![](https://media.discordapp.net/attachments/742236419757703229/775560486061735996/carbon-17.png?width=406&height=471)

    Se probó la función varias veces, se probó con el fibonacci de 16000 antes y después de los 5 minutos:
    
![](https://media.discordapp.net/attachments/742236419757703229/775560077746241546/Screen_Shot_2020-11-06_at_7.14.25_PM.png?width=790&height=471)
    ![](https://media.discordapp.net/attachments/742236419757703229/775560074365894696/Screen_Shot_2020-11-06_at_7.22.25_PM.png?width=790&height=471)
    
   Como se evidencia anteriormente, luego de los 5 minutos toma una mayor cantidad de tiempo en realizarse la petición.
   Aquí el resultado de las pruebas con los valores anteriores:
   
   ![](https://media.discordapp.net/attachments/742236419757703229/775558321360863239/Screen_Shot_2020-11-06_at_7.13.53_PM.png?width=347&height=471)

**Preguntas**

* **¿Qué es un Azure Function?**
    Azure Function es un servicio informatico sin servidor que permite ejecutar pequeños fragmentos de código (funciones) sin necesidad de establecer una infraestructura para la aplicación. Con Azure Functions, la infraestructura en la nube proporciona todos los servidores actualizados que necesita para mantener la aplicación funcionando.
* **¿Qué es serverless?**
    Serverless es un modelo de ejecución en el que el proveedor en la nube es responsable de ejecutar un fragmento de código mediante la asignación dinámica de los recursos y cobrando solo por la cantidad de recursos utilizados para ejecutar el código. 
    El código puede ser ejecutado gracias a una cantidad de eventos que lo accionan como por ejemplo solicitudes HTTP, eventos de base de datos, servicios de colas, alertas de monitoreo, carga de archivos, eventos programados (trabajos cron), etc.

* **¿Qué es el runtime y que implica seleccionarlo al momento de crear el Function App?**
    Runtime es el intervalo de tiempo en el que un programa de computadora se ejecuta en un sistema operativo. Este tiempo se inicia con la puesta en memoria principal del programa, por lo que el sistema operativo comienza a ejecutar sus instrucciones, al seleccionarlo al crear el function app basicamente se va a decidir el tiempo en el que se va a ejecutar un programa dependiendo del entorno elegido (.NET core, python, java, etc).

* **¿Por qué es necesario crear un Storage Account de la mano de un Function App?**
    Por que Azure functions depende de un Storage Account para administrar desencadenadores o también ejecutar las funciones de registro.
    
* **¿Cuáles son los tipos de planes para un Function App?, ¿En qué se diferencias?, mencione ventajas y desventajas de cada uno de ellos.**
    * *Plan de consumo*: Cuando se usa el plan de consumo, las instancias del host de Azure Functions se agregan y quitan de forma dinámica según el número de eventos entrantes. Este plan sin servidor se escala automáticamente y solo se le cobra por los recursos de proceso cuando se ejecutan las funciones. En un plan de consumo, se agota el tiempo de espera de una ejecución de función tras un período de tiempo configurable.
    Ventajas:
        * Solo se paga por los recursos utilizados.
        * Escala horizontalmente de manera automatica, incluso durante periodos de gran carga.
    * *Plan premium*: Cuando se usa el plan Prémium, las instancias del host de Azure Functions se agregan y quitan según el número de eventos entrantes al igual que con el plan de consumo.
    
        Ventajas: 
        * Instancias permanentemente semiactivas para evitar cualquier inicio en frío
        * Conectividad de red virtual
        * Duración de la ejecución ilimitada (60 minutos garantizados)
        * Tamaños de la instancia Prémium (un núcleo, dos núcleos y cuatro instancias de núcleo)
        * Precios más previsibles
        * Asignación de aplicaciones de alta densidad para planes con varias aplicaciones de funciones
    * *Plan de servicio de aplicaciones*: Las aplicaciones de funciones también pueden ejecutarse en las mismas máquinas virtuales dedicadas que otras aplicaciones de App Service (SKU básica, estándar, prémium y aislada), con este plan, para escalar horizontalmente de forma manual, se puede agregar más instancias de máquina virtual. También puede habilitar el escalado automático, aunque este sea más lento que la escala elástica del plan Premium.
    Ventajas:
        * Tiene máquinas virtuales infrautilizadas que ya ejecutan otras instancias de App Service.
        * Quiere proporcionar una imagen personalizada en la que ejecutar sus funciones.
    * *Diferencias*: La diferencia entre cada uno de estos planes es que el plan de consumo varía la cantidad de recursos ofrecidos según la necesidad del usuario, mientras que el plan premium permite un mayor desempeño para las funciones y mayores capacidades de procesamiento. Y finalmente el plan de servicio de aplicaciones proporciona herramientas para aquellos que necesitan hacer calculos con una mayor carga.


* **¿Por qué la memoization falla o no funciona de forma correcta?**
    La memorización falla debido a que después de un lapso de tiempo (5 minutos) de no realizar solicitudes a nuestra función esta borra toda la memoria y se ve obligada a calcular todo.
    
* **¿Cómo funciona el sistema de facturación de las Function App?**
    Para todos los tipos se mira según el numero de ejecuciones realizadas por mes, además hay otros factores que influyen en la facturación dependiendo del plan, por ejemplo el consumo de recursos en donde se factura según el uso de estos, la duración de uso de VCPU y la duración de uso de la memoria.

    
