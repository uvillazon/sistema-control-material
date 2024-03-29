﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.18408
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ClienteConsola.ServiceReference2 {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(Namespace="http://ws.cdyne.com/", ConfigurationName="ServiceReference2.IP2GeoSoap")]
    public interface IP2GeoSoap {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://ws.cdyne.com/ResolveIP", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        ClienteConsola.ServiceReference2.IPInformation ResolveIP(string ipAddress, string licenseKey);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://ws.cdyne.com/ResolveIP", ReplyAction="*")]
        System.Threading.Tasks.Task<ClienteConsola.ServiceReference2.IPInformation> ResolveIPAsync(string ipAddress, string licenseKey);
    }
    
    /// <comentarios/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.0.30319.18408")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://ws.cdyne.com/")]
    public partial class IPInformation : object, System.ComponentModel.INotifyPropertyChanged {
        
        private string cityField;
        
        private string stateProvinceField;
        
        private string countryField;
        
        private string organizationField;
        
        private double latitudeField;
        
        private double longitudeField;
        
        private string areaCodeField;
        
        private string timeZoneField;
        
        private bool hasDaylightSavingsField;
        
        private short certaintyField;
        
        private string regionNameField;
        
        private string countryCodeField;
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=0)]
        public string City {
            get {
                return this.cityField;
            }
            set {
                this.cityField = value;
                this.RaisePropertyChanged("City");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=1)]
        public string StateProvince {
            get {
                return this.stateProvinceField;
            }
            set {
                this.stateProvinceField = value;
                this.RaisePropertyChanged("StateProvince");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=2)]
        public string Country {
            get {
                return this.countryField;
            }
            set {
                this.countryField = value;
                this.RaisePropertyChanged("Country");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=3)]
        public string Organization {
            get {
                return this.organizationField;
            }
            set {
                this.organizationField = value;
                this.RaisePropertyChanged("Organization");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=4)]
        public double Latitude {
            get {
                return this.latitudeField;
            }
            set {
                this.latitudeField = value;
                this.RaisePropertyChanged("Latitude");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=5)]
        public double Longitude {
            get {
                return this.longitudeField;
            }
            set {
                this.longitudeField = value;
                this.RaisePropertyChanged("Longitude");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=6)]
        public string AreaCode {
            get {
                return this.areaCodeField;
            }
            set {
                this.areaCodeField = value;
                this.RaisePropertyChanged("AreaCode");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=7)]
        public string TimeZone {
            get {
                return this.timeZoneField;
            }
            set {
                this.timeZoneField = value;
                this.RaisePropertyChanged("TimeZone");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=8)]
        public bool HasDaylightSavings {
            get {
                return this.hasDaylightSavingsField;
            }
            set {
                this.hasDaylightSavingsField = value;
                this.RaisePropertyChanged("HasDaylightSavings");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=9)]
        public short Certainty {
            get {
                return this.certaintyField;
            }
            set {
                this.certaintyField = value;
                this.RaisePropertyChanged("Certainty");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=10)]
        public string RegionName {
            get {
                return this.regionNameField;
            }
            set {
                this.regionNameField = value;
                this.RaisePropertyChanged("RegionName");
            }
        }
        
        /// <comentarios/>
        [System.Xml.Serialization.XmlElementAttribute(Order=11)]
        public string CountryCode {
            get {
                return this.countryCodeField;
            }
            set {
                this.countryCodeField = value;
                this.RaisePropertyChanged("CountryCode");
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IP2GeoSoapChannel : ClienteConsola.ServiceReference2.IP2GeoSoap, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class P2GeoSoapClient : System.ServiceModel.ClientBase<ClienteConsola.ServiceReference2.IP2GeoSoap>, ClienteConsola.ServiceReference2.IP2GeoSoap {
        
        public P2GeoSoapClient() {
        }
        
        public P2GeoSoapClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public P2GeoSoapClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public P2GeoSoapClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public P2GeoSoapClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public ClienteConsola.ServiceReference2.IPInformation ResolveIP(string ipAddress, string licenseKey) {
            return base.Channel.ResolveIP(ipAddress, licenseKey);
        }
        
        public System.Threading.Tasks.Task<ClienteConsola.ServiceReference2.IPInformation> ResolveIPAsync(string ipAddress, string licenseKey) {
            return base.Channel.ResolveIPAsync(ipAddress, licenseKey);
        }
    }
}
